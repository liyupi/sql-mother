<template>
  <a-modal
    v-model:visible="dialogVisible"
    title="AI 助手配置"
    :width="600"
    @ok="handleSave"
    @cancel="handleCancel"
  >
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="API 格式">
        <a-select
          v-model:value="formData.provider"
          @change="handleProviderChange"
        >
          <a-select-option
            v-for="(name, key) in PROVIDER_NAMES"
            :key="key"
            :value="key"
          >
            {{ name }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Base URL">
        <a-input
          v-model:value="formData.baseURL"
          placeholder="可选，用于自定义 API 端点"
        />
      </a-form-item>

      <a-form-item label="API Key">
        <a-input-password
          v-model:value="formData.apiKey"
          placeholder="请输入 API Key"
        />
      </a-form-item>

      <a-form-item label="模型">
        <a-input-group compact>
          <a-auto-complete
            v-model:value="formData.model"
            :options="modelOptions"
            style="width: calc(100% - 32px)"
            placeholder="选择或输入模型名称"
            :filter-option="filterModelOption"
          />
          <a-button
            :loading="fetchingModels"
            title="获取模型列表"
            @click="fetchModels"
          >
            <template #icon><sync-outlined :spin="fetchingModels" /></template>
          </a-button>
        </a-input-group>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
        <a-space>
          <a-button :loading="testing" @click="handleTest"> 测试连接 </a-button>
          <a-tag
            v-if="testResult"
            :color="testResult.success ? 'green' : 'red'"
          >
            {{ testResult.message }}
          </a-tag>
        </a-space>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { message } from "ant-design-vue";
import { useGlobalStore } from "../core/globalStore";
import {
  AIProvider,
  AIConfig,
  DEFAULT_MODELS,
  PROVIDER_NAMES,
} from "../core/ai.d";
import { createAIClient } from "../core/aiClient";
import { SyncOutlined } from "@ant-design/icons-vue";

interface Props {
  visible: boolean;
}

interface Emits {
  (e: "update:visible", value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit("update:visible", val),
});

const globalStore = useGlobalStore();

// 表单数据
const formData = ref<AIConfig>({
  provider: AIProvider.OPENAI,
  apiKey: "",
  model: DEFAULT_MODELS[AIProvider.OPENAI][0],
  baseURL: "",
});

// 测试状态
const testing = ref(false);
const testResult = ref<{ success: boolean; message: string } | null>(null);

// 模型列表相关
const fetchingModels = ref(false);
const fetchedModels = ref<string[]>([]);

// 计算模型选项
const modelOptions = computed(() => {
  // 合并默认模型和获取到的模型
  const defaultModels = DEFAULT_MODELS[formData.value.provider] || [];
  const allModels = Array.from(
    new Set([...defaultModels, ...fetchedModels.value])
  );
  return allModels.map((model) => ({ value: model }));
});

// 过滤模型选项
const filterModelOption = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

// 获取模型列表
const fetchModels = async () => {
  if (!formData.value.apiKey) {
    message.warning("请先输入 API Key");
    return;
  }

  fetchingModels.value = true;
  try {
    const client = createAIClient(formData.value);
    const models = await client.getModels();

    if (models.length > 0) {
      fetchedModels.value = models;
      message.success(`成功获取 ${models.length} 个模型`);
      // 如果当前没有选模型，或者当前选的模型不在列表中，可以考虑默认选中第一个？
      // 暂时保持用户当前输入，除非是空的
      if (!formData.value.model) {
        formData.value.model = models[0];
      }
    } else {
      message.warning("未获取到模型列表，请检查配置或手动输入");
    }
  } catch (error: any) {
    console.error("Fetch models error:", error);
    message.error("获取模型列表失败，请手动输入");
  } finally {
    fetchingModels.value = false;
  }
};

// 当提供商变化时
const handleProviderChange = () => {
  const models = DEFAULT_MODELS[formData.value.provider];
  if (models && models.length > 0) {
    formData.value.model = models[0];
  }
  // 清空已获取的模型，因为提供商变了
  fetchedModels.value = [];
  testResult.value = null;
};

// 测试连接
const handleTest = async () => {
  if (!formData.value.apiKey) {
    message.warning("请先输入 API Key");
    return;
  }

  testing.value = true;
  testResult.value = null;

  try {
    const client = createAIClient(formData.value);
    const response = await client.testConnection();

    if (response.success) {
      testResult.value = {
        success: true,
        message: "连接成功！",
      };
      message.success("连接测试成功！");
    } else {
      testResult.value = {
        success: false,
        message: response.error || "连接失败",
      };
      message.error(response.error || "连接测试失败");
    }
  } catch (error: any) {
    testResult.value = {
      success: false,
      message: error.message || "未知错误",
    };
    message.error("连接测试失败：" + error.message);
  } finally {
    testing.value = false;
  }
};

// 保存配置
const handleSave = () => {
  if (!formData.value.apiKey) {
    message.warning("请输入 API Key");
    return;
  }

  globalStore.aiConfig = { ...formData.value };
  message.success("AI 配置已保存！");
  emit("update:visible", false);
};

// 取消
const handleCancel = () => {
  emit("update:visible", false);
};

// 监听弹窗打开，加载现有配置
watch(
  () => props.visible,
  (newVisible) => {
    if (newVisible && globalStore.aiConfig) {
      formData.value = { ...globalStore.aiConfig };
    }
    testResult.value = null;
  }
);
</script>

<style scoped>
.ant-form-item {
  margin-bottom: 16px;
}
</style>
