import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
// @ts-ignore
import markdownItKatex from "markdown-it-katex";

// 创建 markdown-it 实例
const md = new MarkdownIt({
    html: true, // 启用 HTML 标签
    linkify: true, // 自动识别链接
    typographer: true, // 启用排版优化
    breaks: true, // 转换段落里的 '\n' 到 <br>
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                const highlighted = hljs.highlight(str, {
                    language: lang,
                }).value;
                return highlighted;
            } catch (__) {}
        }
        return ""; // 使用额外的默认转义
    },
});

// 添加 KaTeX 插件支持 LaTeX 数学公式
md.use(markdownItKatex, {
    throwOnError: false,
    errorColor: "#cc0000",
    strict: false,
    trust: true,
    delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true },
    ],
});

// 生成唯一ID
let codeBlockId = 0;

// 自定义渲染规则
md.renderer.rules.table_open = () =>
    '<div class="table-wrapper"><table class="markdown-table">';
md.renderer.rules.table_close = () => "</table></div>";

md.renderer.rules.code_block = (tokens, idx) => {
    const token = tokens[idx];
    const lang = token.info || "text";
    const id = `code-block-${++codeBlockId}`;

    let highlighted = token.content;
    if (lang && hljs.getLanguage(lang)) {
        try {
            highlighted = hljs.highlight(token.content, {
                language: lang,
            }).value;
        } catch (__) {
            highlighted = token.content;
        }
    }

    return `
    <div class="code-block">
      <div class="code-header">
        <span class="code-lang">${lang}</span>
        <button class="copy-btn" onclick="copyToClipboard('${id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          复制
        </button>
      </div>
      <pre><code id="${id}" class="hljs language-${lang}">${highlighted}</code></pre>
    </div>
  `;
};

md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx];
    const lang = token.info || "text";
    const id = `code-block-${++codeBlockId}`;

    let highlighted = token.content;
    if (lang && hljs.getLanguage(lang)) {
        try {
            highlighted = hljs.highlight(token.content, {
                language: lang,
            }).value;
        } catch (__) {
            highlighted = token.content;
        }
    }

    return `
    <div class="code-block">
      <div class="code-header">
        <span class="code-lang">${lang}</span>
        <button class="copy-btn" onclick="copyToClipboard('${id}')">
          复制
        </button>
      </div>
      <pre><code id="${id}" class="hljs language-${lang}">${highlighted}</code></pre>
    </div>
  `;
};

// 自定义容器解析器 - 用于解析 :::demo 语法
md.use((md) => {
    const fence = md.renderer.rules.fence?.bind(md.renderer.rules);

    md.renderer.rules.fence = (tokens, idx, options, env, renderer) => {
        const token = tokens[idx];
        const info = token.info ? token.info.trim() : "";

        // 检查是否是 demo 块
        if (info.startsWith("demo")) {
            const lines = token.content.split("\n");
            let title = "演示效果";
            let path = "";
            let height = "400px";
            let htmlContent = "";

            // 解析配置
            let configEnd = 0;
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line.startsWith("title:")) {
                    title = line.replace("title:", "").trim();
                } else if (line.startsWith("path:")) {
                    path = line.replace("path:", "").trim();
                } else if (line.startsWith("height:")) {
                    height = line.replace("height:", "").trim();
                } else if (line === "---" || line === "") {
                    configEnd = i + 1;
                    break;
                } else if (!line.includes(":")) {
                    configEnd = i;
                    break;
                }
            }

            // 获取HTML内容
            htmlContent = lines.slice(configEnd).join("\n").trim();

            // 如果有路径，使用iframe；否则使用直接嵌入
            let demoContent = "";
            if (path) {
                demoContent = `<iframe src="${path}" style="width: 100%; height: ${height}; border: none; border-radius: 8px;"></iframe>`;
            } else if (htmlContent) {
                demoContent = `
                    <div class="demo-preview" style="height: ${height};">
                        <iframe srcdoc="${htmlContent.replace(
                            /"/g,
                            "&quot;"
                        )}" style="width: 100%; height: 100%; border: none; border-radius: 8px;"></iframe>
                    </div>
                `;
            }

            return `
                <div class="demo-container">
                    <div class="demo-header">
                        <h4 class="demo-title">${title}</h4>
                        <div class="demo-actions">
                            ${
                                path
                                    ? `<button class="demo-btn" onclick="window.open('${path}', '_blank')">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15,3 21,3 21,9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                                新窗口打开
                            </button>`
                                    : ""
                            }
                        </div>
                    </div>
                    <div class="demo-content">
                        ${demoContent}
                    </div>
                </div>
            `;
        }

        // 非demo块，使用原来的渲染
        return fence ? fence(tokens, idx, options, env, renderer) : "";
    };
});

export const renderMarkdown = (
    content: string,
    options: { removeFirstH1?: boolean } = {}
): string => {
    let processedContent = content;

    // 如果需要移除第一个 h1 标题
    if (options.removeFirstH1) {
        processedContent = content.replace(/^#\s+.+$/m, "");
    }

    return md.render(processedContent);
};
