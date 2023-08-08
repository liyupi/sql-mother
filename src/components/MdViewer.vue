<template>
  <Viewer :value="value" :plugins="plugins" />
</template>

<script setup lang="ts">
import { Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "bytemd/dist/index.css";
import "highlight.js/styles/default.css";
import "github-markdown-css/github-markdown-light.css";

const plugins = [gfm(), highlight()];

interface Props {
  value: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => {
    return "";
  },
});
</script>
