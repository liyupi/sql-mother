<template>
  <div class="code-editor">
    <div ref="editorRef" :style="editorStyle" />
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, onMounted, onUnmounted, ref, toRaw, watch } from "vue";
import * as monaco from "monaco-editor";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
// eslint-disable-next-line no-undef
import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;

(self as any).MonacoEnvironment = {
  getWorker(_: any, label: any) {
    return new EditorWorker();
  },
};

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

onMounted(async () => {
  // 初始化代码编辑器
  if (editorRef.value) {
    inputEditor.value = monaco.editor.create(editorRef.value, {
      value: props.initValue,
      language: "sql",
      theme: "vs-dark",
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

onUnmounted(() => {
  if (inputEditor.value) {
    toRaw(inputEditor.value).dispose();
  }
});
</script>

<style></style>
