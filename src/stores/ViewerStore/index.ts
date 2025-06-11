// src/stores/ViewerStore/index.ts
import { defineStore } from "pinia";
import { shallowRef, type ShallowRef } from "vue";
import { Viewer } from "@/earth-sdk";

export const useViewerStore = defineStore("viewer", () => {
    const viewer: ShallowRef<Viewer | null> = shallowRef(null);
    const isInitialized = shallowRef<boolean>(false);
    const isLoading = shallowRef<boolean>(false);
});
