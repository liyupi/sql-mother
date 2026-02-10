<template>
  <div class="code-editor">
    <div ref="editorRef" :style="editorStyle" />
  </div>
</template>

<script setup lang="ts">
import {
  CSSProperties,
  computed,
  onMounted,
  onUnmounted,
  ref,
  toRaw,
  watch,
} from "vue";
import type { editor } from "monaco-editor";
import { useGlobalStore } from "../core/globalStore";
import { ensureMonacoSqlLanguage } from "../core/monacoSql";

type IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

// @ts-ignore
interface Props {
  initValue?: string;
  readOnly?: boolean;
  editorStyle?: CSSProperties;
}

const props = withDefaults(defineProps<Props>(), {
  initValue: "",
  readOnly: false,
  editorStyle: undefined,
});
const inputEditor = ref<IStandaloneCodeEditor>();
const editorRef = ref<HTMLElement>();
const monacoRef = ref<any>(null);
const globalStore = useGlobalStore();
const editorTheme = computed(() =>
  globalStore.theme === "dark" ? "vs-dark" : "vs"
);

onMounted(async () => {
  if (editorRef.value) {
    const monaco = await import("monaco-editor/esm/vs/editor/editor.api");
    const { default: EditorWorker } = await import(
      "monaco-editor/esm/vs/editor/editor.worker?worker"
    );
    (self as any).MonacoEnvironment = {
      getWorker() {
        return new EditorWorker();
      },
    };
    // 手动注册 SQL 语言（按需导入 editor.api 不会自动注册语言）
    await ensureMonacoSqlLanguage(monaco);
    monacoRef.value = monaco;
    inputEditor.value = monaco.editor.create(editorRef.value, {
      value: props.initValue,
      language: "sql",
      theme: editorTheme.value,
      readOnly: props.readOnly,
      formatOnPaste: true,
      automaticLayout: true,
      fontSize: 15,
      minimap: {
        enabled: false,
      },
    });
  }
});

watch(
  () => props.initValue,
  () => {
    if (editorRef.value && inputEditor.value) {
      toRaw(inputEditor.value).setValue(props.initValue);
    }
  }
);

watch(editorTheme, (theme) => {
  if (inputEditor.value && monacoRef.value) {
    monacoRef.value.editor.setTheme(theme);
  }
});

onUnmounted(() => {
  if (inputEditor.value) {
    toRaw(inputEditor.value).dispose();
  }
});
</script>

<style></style>
