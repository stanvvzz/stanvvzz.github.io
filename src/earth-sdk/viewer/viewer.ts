import {
    WGS84_ELLIPSOID,
    GlobeControls,
    CameraTransitionManager,
    TilesRenderer,
} from "3d-tiles-renderer";
import {
    TilesFadePlugin,
    UpdateOnChangePlugin,
    TileCompressionPlugin,
    UnloadTilesPlugin,
    GLTFExtensionsPlugin,
    BatchedTilesPlugin,
    CesiumIonAuthPlugin,
} from "3d-tiles-renderer/plugins";
import {
    Vector3,
    Scene,
    WebGLRenderer,
    PerspectiveCamera,
    OrthographicCamera,
    Color,
    MathUtils,
    EventDispatcher,
} from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
// @ts-ignore
import { TopoLinesPlugin } from "../plugins/topolines/TopoLinesPlugin.js";
import gsap from "gsap";

interface ViewerOptions {
    useBatchedMesh?: boolean;
    displayTopoLines?: false;
    errorTarget?: number;
    topoLinesOptions?: TopoLinesOptions;
}

interface TopoLinesOptions {
    display: boolean;
    projection: string;
    thickness: number;
    topoColor: Color;
    topoOpacity: number;
    cartoColor: Color;
    cartoOpacity: number;
}

interface CameraChangeEvent {
    camera: PerspectiveCamera | OrthographicCamera;
    prevCamera: PerspectiveCamera | OrthographicCamera;
}

interface CameraMoveEvent {
    data: {
        latitude: number;
        longitude: number;
        height: number;
    };
}
interface ViewerEvents {
    "camera-move": CameraMoveEvent;
}

// 经纬度和高度的初始值
// 这里使用北京的经纬度和一个高度值作为示例
const BJLat = 39.9;
const BJLon = 116.4;
const BJHeight = 4000000;

const BJPos = new Vector3();
WGS84_ELLIPSOID.getCartographicToPosition(
    BJLat * MathUtils.DEG2RAD,
    BJLon * MathUtils.DEG2RAD,
    BJHeight,
    BJPos
);

// 因为three.js的坐标系是右手系，而WGS84椭球体的坐标系是左手系，所以需要将Y轴翻转
BJPos.applyAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2);

console.log("BJPos", BJPos);

class Viewer extends EventDispatcher<ViewerEvents> {
    private _dom: HTMLElement;
    private _renderer: WebGLRenderer;
    private _scene: Scene;
    private _transition: any;
    private _tiles: any;
    private _controls: any;
    private _useBatchedMesh: boolean = false;
    private _errorTarget: number = 20;
    private _canvas: HTMLCanvasElement;
    private _topoLinesOptions: TopoLinesOptions = {
        display: false,
        projection: "ellipsoid",
        thickness: 1,
        topoColor: new Color("#fff"),
        topoOpacity: 0.5,
        // 坐标网格线
        cartoColor: new Color("#fff"),
        cartoOpacity: 0.5,
    };
    private _lastCameraPosition: {
        lon: number;
        lat: number;
        height: number;
    } | null = null;
    private _latitude: number = 0;
    private _longitude: number = 0;
    private _height: number = 0;

    constructor(dom: HTMLElement, options: ViewerOptions) {
        super();

        this._initOptions(options);

        // dom
        this._dom = dom;

        // renderer
        this._renderer = new WebGLRenderer({ antialias: true });
        this._renderer.setClearColor(0x151c1f);
        this._canvas = this._renderer.domElement as HTMLCanvasElement;
        this._dom.appendChild(this._canvas);

        // scene
        this._scene = new Scene();

        // 相机系统
        const aspect = this._canvas.clientWidth / this._canvas.clientHeight;
        this._transition = new CameraTransitionManager(
            new PerspectiveCamera(60, aspect, 1, 160000000),
            new OrthographicCamera(-1, 1, 1, -1, 1, 160000000)
        );
        this._transition.perspectiveCamera.position.copy(BJPos);
        this._transition.perspectiveCamera.lookAt(0, 0, 0);
        this._transition.autoSync = false;

        this._transition.addEventListener(
            "camera-change",
            ({ camera, prevCamera }: CameraChangeEvent) => {
                this._tiles.deleteCamera(prevCamera);
                this._tiles.setCamera(camera);
                this._controls.setCamera(camera);
            }
        );

        // disable adjusting the orthographic camera position for zoom since globe controls will do this
        this._transition.orthographicPositionalZoom = false;

        // controls
        this._controls = new GlobeControls(
            this._scene,
            this._transition.camera,
            this._renderer.domElement,
            undefined
        );
        // 阻尼效果
        this._controls.enableDamping = true;

        this._reinstantiateTiles();

        this._resizeRendererToDisplaySize(this._renderer);

        this._animate();
    }

    /**
     * 获取相机
     *
     * @readonly
     * @memberof Viewer
     */
    get camera() {
        return this._transition.camera;
    }

    get tiles() {
        return this._tiles;
    }

    /**
     * 摘取自官网demo
     *
     * @readonly
     * @memberof Viewer
     */
    get latitude(): number {
        return this._latitude;
    }

    get longitude(): number {
        return this._longitude;
    }

    get height(): number {
        return this._height;
    }

    /**
     * 获取相机的 Heading（方位角）
     * @returns 方位角（度），0° = 北，90° = 东，180° = 南，270° = 西
     */
    get heading(): number {
        const camera = this.camera;
        const cameraPos = camera.position.clone();
        const direction = new Vector3();
        camera.getWorldDirection(direction);

        // 计算当前相机位置到地心的向量（地球表面法向量）
        // 需要考虑地球的旋转变换
        const mat = this.tiles.group.matrixWorld.clone().invert();
        const localCameraPos = cameraPos.clone().applyMatrix4(mat);

        // 获取当前位置的地球表面法向量
        const res: { lat?: number; lon?: number; height?: number } = {};
        WGS84_ELLIPSOID.getPositionToCartographic(localCameraPos, res);

        // 计算地表法向量（指向天空）
        const normal = new Vector3();
        WGS84_ELLIPSOID.getCartographicToPosition(
            res.lat ?? 0,
            res.lon ?? 0,
            0, // 高度设为0，获取地表法向量
            normal
        );
        normal.normalize();

        // 应用地球的旋转变换
        normal.applyMatrix4(this.tiles.group.matrixWorld);
        normal.normalize();

        // 计算北方向向量（在当前位置的切平面上）
        // 北方向 = 指向北极的向量在地表切平面上的投影
        const northPole = new Vector3(0, 0, 1); // WGS84 坐标系中的北极方向
        northPole.applyMatrix4(this.tiles.group.matrixWorld);
        northPole.normalize();

        // 计算北方向在地表切平面上的投影
        const northOnSurface = northPole
            .clone()
            .sub(normal.clone().multiplyScalar(northPole.dot(normal)));
        northOnSurface.normalize();

        // 计算东方向向量（垂直于北方向和法向量）
        const eastOnSurface = new Vector3().crossVectors(
            normal,
            northOnSurface
        );
        eastOnSurface.normalize();

        // 将相机朝向投影到地表切平面上
        const directionOnSurface = direction
            .clone()
            .sub(normal.clone().multiplyScalar(direction.dot(normal)));
        directionOnSurface.normalize();

        // 计算方位角
        const northDot = directionOnSurface.dot(northOnSurface);
        const eastDot = directionOnSurface.dot(eastOnSurface);

        const heading = Math.atan2(eastDot, northDot) * MathUtils.RAD2DEG;

        return (-heading + 360) % 360;
    }

    /**
     * 获取相机的 Pitch（俯仰角）
     * @returns 俯仰角（度），正值向上看，负值向下看
     */
    get pitch(): number {
        const camera = this.camera;
        const cameraPos = camera.position.clone();
        const direction = new Vector3();
        camera.getWorldDirection(direction);

        // 计算当前相机位置到地心的向量（地球表面法向量）
        // 需要考虑地球的旋转变换
        // 获取瓦片的逆变换矩阵
        const mat = this.tiles.group.matrixWorld.clone().invert();
        // 转换为局部坐标系
        const localCameraPos = cameraPos.clone().applyMatrix4(mat);

        // 获取当前位置的地球表面法向量
        const res: { lat?: number; lon?: number; height?: number } = {};
        WGS84_ELLIPSOID.getPositionToCartographic(localCameraPos, res);

        // 重新计算该位置的法向量（指向地心的相反方向）
        const normal = new Vector3();
        // 使用WGS84椭球体获取地表法向量
        WGS84_ELLIPSOID.getCartographicToPosition(
            res.lat ?? 0,
            res.lon ?? 0,
            0, // 高度设为0，获取地表法向量
            normal
        );
        normal.normalize();

        // 应用地球的旋转变换
        normal.applyMatrix4(this.tiles.group.matrixWorld);
        normal.normalize();

        // 计算相机朝向与地表法向量的夹角
        // pitch = 夹角 - 90°，因为法向量指向天空，我们要的是相对于地平面的角度
        const dotProduct = direction.dot(normal);
        const pitch = Math.asin(dotProduct) * MathUtils.RAD2DEG;

        return pitch;
    }

    /**
     * 获取或设置是否显示地形等高线
     *
     * @memberof Viewer
     */
    get displayTopoLines() {
        return this._topoLinesOptions.display;
    }

    /**
     * 设置是否显示地形等高线
     *
     * @memberof Viewer
     */
    set displayTopoLines(value: boolean) {
        this._topoLinesOptions.display = value;
        const plugin = this._tiles.getPluginByName("TOPO_LINES_PLUGIN");
        plugin.topoOpacity = value ? this._topoLinesOptions.topoOpacity : 0;
        plugin.cartoOpacity = value ? this._topoLinesOptions.cartoOpacity : 0;
    }

    /**
     * 获取或设置地形等高线的厚度
     *
     * @memberof Viewer
     */
    get topoLineTopoColor() {
        return this._topoLinesOptions.topoColor;
    }

    /**
     * 获取或设置地形等高线的颜色
     *
     * @memberof Viewer
     */
    set topoLineTopoColor(value: Color) {
        this._topoLinesOptions.topoColor = value;
        const plugin = this._tiles.getPluginByName("TOPO_LINES_PLUGIN");
        plugin.topoColor = value;
    }

    /**
     * 获取或设置地形等高线的颜色
     *
     * @memberof Viewer
     */
    get topoLineCartoColor() {
        return this._topoLinesOptions.cartoColor;
    }

    /**
     * 获取或设置地形等高线的颜色
     *
     * @memberof Viewer
     */
    set topoLineCartoColor(value: Color) {
        this._topoLinesOptions.cartoColor = value;
        const plugin = this._tiles.getPluginByName("TOPO_LINES_PLUGIN");
        plugin.cartoColor = value;
    }

    /**
     * 获取或设置地形等高线的透明度
     *
     * @memberof Viewer
     */
    get topoLinesOpacity() {
        const plugin = this._tiles.getPluginByName("TOPO_LINES_PLUGIN");
        return plugin.topoOpacity;
    }

    /**
     * 设置地形等高线的透明度
     *
     * @memberof Viewer
     */
    set topoLinesOpacity(value: number) {
        const plugin = this._tiles.getPluginByName("TOPO_LINES_PLUGIN");
        plugin.topoOpacity = value;
        plugin.cartoOpacity = value;
    }

    /**
     * 获取或设置地形等高线的投影方式
     *
     * @memberof Viewer
     */
    get topoLinesCartoOpacity() {
        const plugin = this._tiles.getPluginByName("TOPO_LINES_PLUGIN");
        return plugin.cartoOpacity;
    }

    /**
     * 设置地形等高线的透明度
     *
     * @memberof Viewer
     */
    set topoLinesCartoOpacity(value: number) {
        const plugin = this._tiles.getPluginByName("TOPO_LINES_PLUGIN");
        plugin.cartoOpacity = value;
    }

    /**
     * 获取或设置地形等高线的投影方式
     *
     * @memberof Viewer
     */
    get topoLinesThickness() {
        return this._topoLinesOptions.thickness;
    }

    /**
     * 设置地形等高线的厚度
     *
     * @memberof Viewer
     */
    set topoLinesThickness(value: number) {
        this._topoLinesOptions.thickness = value;
        const plugin = this._tiles.getPluginByName("TOPO_LINES_PLUGIN");
        plugin.thickness = value;
    }

    _initOptions(options: ViewerOptions) {
        this._useBatchedMesh = options.useBatchedMesh || false;
        this._errorTarget = options.errorTarget || 20;

        if (options.topoLinesOptions) {
            this._topoLinesOptions = {
                ...this._topoLinesOptions,
                ...options.topoLinesOptions,
            };
        }
    }

    _reinstantiateTiles() {
        if (this._tiles) {
            this._scene.remove(this._tiles.group);
            this._tiles.dispose();
            this._tiles = null;
        }

        this._tiles = new TilesRenderer();
        this._tiles.registerPlugin(
            new CesiumIonAuthPlugin({
                apiToken:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwYTA1ODM2Zi03MzY5LTQxY2ItYWRiNy02N2FhODA3MTE2NWUiLCJpZCI6MTQ0NzgzLCJpYXQiOjE2ODYwMjkwNDR9.wIRE1j-xnmaM7Ak_LbA4fql--WUShGzXd-N2GtzrQd0",
                assetId: "2275207",
                autoRefreshToken: true,
            })
        );
        // 处理压缩格式的瓦片数据
        this._tiles.registerPlugin(new TileCompressionPlugin());
        // 当参数变化时触发更新
        this._tiles.registerPlugin(new UpdateOnChangePlugin());
        // 管理不再可见的瓦片的资源释放
        this._tiles.registerPlugin(new UnloadTilesPlugin());
        // 平滑效果
        this._tiles.registerPlugin(new TilesFadePlugin());
        // 地形等高线可视化插件
        this._tiles.registerPlugin(
            new TopoLinesPlugin({ projection: "ellipsoid" })
        );
        // gltf插件
        this._tiles.registerPlugin(
            new GLTFExtensionsPlugin({
                // Note the DRACO compression files need to be supplied via an explicit source.
                // We use unpkg here but in practice should be provided by the application.
                dracoLoader: new DRACOLoader().setDecoderPath(
                    "https://unpkg.com/three@0.153.0/examples/jsm/libs/draco/gltf/"
                ),
            })
        );

        // 是否启用批处理
        if (this._useBatchedMesh) {
            this._tiles.registerPlugin(
                new BatchedTilesPlugin({
                    renderer: this._renderer,
                    discardOriginalContent: false,
                    instanceCount: 500,
                    vertexCount: 750,
                    indexCount: 2000,
                    expandPercent: 0.25,
                    maxInstanceCount: Infinity,
                    textureSize: null, // 纹理大小
                    material: null, // 材质
                })
            );
        }

        // 校正地理坐标系
        this._tiles.group.rotation.x = -Math.PI / 2;
        this._scene.add(this._tiles.group);

        this._tiles.setResolutionFromRenderer(
            this._transition.camera,
            this._renderer
        );
        this._tiles.setCamera(this._transition.camera);

        // 控制器关联
        this._controls.setTilesRenderer(this._tiles);
    }

    _animate() {
        requestAnimationFrame(this._animate.bind(this));

        if (!this._tiles) return;

        const camera = this._transition.camera;

        if (this._resizeRendererToDisplaySize(this._renderer)) {
            const aspect = this._dom.clientWidth / this._dom.clientHeight;
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
        }

        this._controls.enabled = !this._transition.animating;
        this._controls.update();
        this._transition.update();

        // update options

        this._tiles.setResolutionFromRenderer(camera, this._renderer);
        this._tiles.setCamera(camera);

        const plugin = this._tiles.getPluginByName("TOPO_LINES_PLUGIN");
        plugin.topoOpacity = this._topoLinesOptions.display
            ? this.topoLinesOpacity
            : 0;
        plugin.topoColor = this.topoLineTopoColor;
        plugin.cartoOpacity = this._topoLinesOptions.display
            ? this.topoLinesCartoOpacity
            : 0;
        plugin.cartoColor = this.topoLineCartoColor;

        // update tiles
        camera.updateMatrixWorld();
        this._tiles.errorTarget = this._errorTarget;
        this._tiles.update();

        this._renderer.render(this._scene, camera);

        // 计算经纬度以及高度
        const mat = this.tiles.group.matrixWorld.clone().invert();
        const vec = this.camera.position.clone().applyMatrix4(mat);
        const res: { lat?: number; lon?: number; height?: number } = {};
        WGS84_ELLIPSOID.getPositionToCartographic(vec, res);

        const lat = (res.lat ?? 0) * MathUtils.RAD2DEG;
        const lon = (res.lon ?? 0) * MathUtils.RAD2DEG;
        const height = res.height ?? 0;

        const newPos = { lat, lon, height };

        this._latitude = lat;
        this._longitude = lon;
        this._height = height;

        // 判断是否变化（可根据精度需求调整）
        if (
            !this._lastCameraPosition ||
            Math.abs(this._lastCameraPosition.lat - lat) > 1e-6 ||
            Math.abs(this._lastCameraPosition.lon - lon) > 1e-6 ||
            Math.abs(this._lastCameraPosition.height - height) > 0.01
        ) {
            this._lastCameraPosition = newPos;

            this.dispatchEvent({
                type: "camera-move",
                data: {
                    latitude: lat,
                    longitude: lon,
                    height: height,
                },
            });
        }
    }

    _resizeRendererToDisplaySize(renderer: WebGLRenderer) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width = Math.floor(this._dom.clientWidth * pixelRatio);
        const height = Math.floor(this._dom.clientHeight * pixelRatio);

        // 比较实际像素尺寸而不是CSS尺寸
        const needResize = canvas.width !== width || canvas.height !== height;

        if (needResize) {
            // 最后参数false表示不更新CSS样式
            renderer.setSize(
                this._dom.clientWidth,
                this._dom.clientHeight,
                true
            );
            renderer.setPixelRatio(pixelRatio);

            // 更新相机参数
            const { perspectiveCamera, orthographicCamera } = this._transition;
            const aspect = this._dom.clientWidth / this._dom.clientHeight;

            perspectiveCamera.aspect = aspect;
            perspectiveCamera.updateProjectionMatrix();

            orthographicCamera.left = -orthographicCamera.top * aspect;
            orthographicCamera.right = -orthographicCamera.left;
            orthographicCamera.updateProjectionMatrix();
        }

        return needResize;
    }

    // viewer 基本功能
    zoomTo(position: { lat: number; lon: number; height: number }) {
        const { lat, lon, height } = position;
        const newPostion = new Vector3();
        WGS84_ELLIPSOID.getCartographicToPosition(
            lat * MathUtils.DEG2RAD,
            lon * MathUtils.DEG2RAD,
            height,
            newPostion
        );
        // 绕着x轴旋转-90度，因为three.js的坐标系是右手系，而WGS84椭球体的坐标系是左手系
        newPostion.applyAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2);
        this._transition.perspectiveCamera.position.copy(newPostion);
        this._transition.perspectiveCamera.lookAt(0, 0, 0);
        this._transition.update();
    }

    flyTo(
        position: { lat: number; lon: number; height: number },
        options: { duration?: number; pitch?: number; heading?: number } = {}
    ) {
        const { lat, lon, height } = position;
        const { duration = 2 } = options;

        // 目标世界坐标
        const target = new Vector3();
        WGS84_ELLIPSOID.getCartographicToPosition(
            lat * MathUtils.DEG2RAD,
            lon * MathUtils.DEG2RAD,
            height,
            target
        );
        // 应用地球旋转
        target.applyAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2);

        // 当前相机
        const camera = this._transition.perspectiveCamera;
        const start = camera.position.clone();

        // 动画
        gsap.to(
            {
                x: start.x,
                y: start.y,
                z: start.z,
            },
            {
                x: target.x,
                y: target.y,
                z: target.z,
                duration,
                ease: "power2.inOut",
                onUpdate: function () {
                    const obj = this.targets()[0];
                    camera.position.set(obj.x, obj.y, obj.z);
                    camera.lookAt(0, 0, 0);
                },
                onComplete: () => {
                    // 设置pitch和heading
                    // pitch为仰角，heading为方位角，单位为度
                    camera.lookAt(0, 0, 0);
                },
            }
        );
    }

    // -----Terrain相关功能-----
    /**
     * 设置地形可见性
     * @param visible 是否显示地形
     */
    setTerrainVisibe(visible: boolean) {
        if (this._tiles.group) {
            this._tiles.group.visible = visible;
        }
    }
}

export { Viewer };
