<template>
  <div class="ai-sidebar-wrapper">
    <!-- 触发按钮 - 悬浮在右侧 -->
    <div
      v-show="!visible"
      class="ai-trigger-btn"
      :class="{ active: visible }"
      @click="toggleSidebar"
    >
      <robot-outlined />
      <span class="btn-text">AI助手</span>
    </div>

    <!-- 侧边栏抽屉 -->
    <a-drawer
      v-model:visible="visible"
      title="🤖 AI 助手"
      placement="right"
      :width="420"
      :header-style="{
        background: 'var(--header-bg)',
        borderBottom: '1px solid var(--border-color)',
      }"
      :body-style="{
        padding: 0,
        background: 'var(--bg-color)',
        height: '100%',
      }"
      :content-wrapper-style="{ boxShadow: '-4px 0 16px rgba(0,0,0,0.1)' }"
      get-container="body"
    >
      <template #extra>
        <a-button type="link" size="small" @click="openConfig">
          <setting-outlined /> 设置
        </a-button>
      </template>

      <div v-if="!hasConfig" class="no-config">
        <div class="no-config-content">
          <robot-outlined class="no-config-icon" />
          <h3>未配置 AI 助手</h3>
          <p>需要配置 API Key 才能使用 AI 助手功能</p>
          <a-button type="primary" size="large" @click="openConfig">
            立即配置
          </a-button>
        </div>
      </div>

      <div v-else class="chat-container">
        <!-- 消息列表 -->
        <div ref="messagesContainer" class="messages-container">
          <div v-if="messages.length === 0" class="empty-chat">
            <bulb-outlined class="empty-icon" />
            <p>有什么 SQL 问题需要帮助吗？</p>
            <p class="hint">点击下方快捷按钮或直接输入问题</p>
          </div>

          <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="['message', `message-${msg.role}`]"
          >
            <div class="message-avatar">
              <user-outlined v-if="msg.role === 'user'" />
              <robot-outlined v-else />
            </div>
            <div class="message-content">
              <md-viewer :value="msg.content" />
              <!-- AI 回复中的 SQL 代码应用按钮 -->
              <div
                v-if="
                  msg.role === 'assistant' && extractSQLFromMessage(msg.content)
                "
                class="sql-actions"
              >
                <a-button
                  type="primary"
                  size="small"
                  @click="applySQLToEditor(extractSQLFromMessage(msg.content)!)"
                >
                  ✨ 应用此 SQL
                </a-button>
              </div>
            </div>
          </div>

          <div v-if="loading" class="message message-assistant">
            <div class="message-avatar">
              <robot-outlined />
            </div>
            <div class="message-content">
              <md-viewer :value="streamingContent || '思考中...'" />
              <span class="cursor-blink">▋</span>
            </div>
          </div>
        </div>

        <!-- 快捷提示 -->
        <div class="quick-actions">
          <a-button
            size="small"
            @click="handleQuickPrompt('请解释一下当前题目的要求')"
          >
            📖 解释题目
          </a-button>
          <a-button
            size="small"
            :disabled="!currentSQL"
            @click="
              handleQuickPrompt(
                '请帮我分析一下这个 SQL 语句：\n```sql\n' + currentSQL + '\n```'
              )
            "
          >
            🔍 分析SQL
          </a-button>
          <a-button
            size="small"
            @click="
              handleQuickPrompt(
                '这个题目应该怎么写 SQL？请给我一些提示，不要直接给出答案'
              )
            "
          >
            💡 获取提示
          </a-button>
          <a-button
            size="small"
            type="primary"
            danger
            :disabled="currentResultStatus !== 0"
            @click="
              handleQuickPrompt(
                '我的 SQL 查询结果不正确，请帮我分析原因并给出修正建议'
              )
            "
          >
            🔧 修正我的SQL
          </a-button>
          <a-button
            size="small"
            :disabled="!currentErrorMsg"
            @click="
              handleQuickPrompt(
                '我的 SQL 执行出错了，请帮我分析错误原因：' + currentErrorMsg
              )
            "
          >
            ⚠️ 分析错误
          </a-button>
          <a-button
            size="small"
            danger
            :disabled="messages.length === 0"
            @click="handleClear"
          >
            🗑️ 清空
          </a-button>
        </div>

        <!-- 输入区域 -->
        <div class="input-area">
          <a-textarea
            v-model:value="inputText"
            placeholder="输入你的问题..."
            :auto-size="{ minRows: 2, maxRows: 4 }"
            @keydown.enter.ctrl="handleSend"
          />
          <a-button
            type="primary"
            class="send-btn"
            :loading="loading"
            :disabled="!inputText.trim()"
            @click="handleSend"
          >
            发送
          </a-button>
          <div class="input-hint">按 Ctrl+Enter 发送</div>
        </div>
      </div>
    </a-drawer>

    <!-- AI 配置弹窗 -->
    <AIConfigModal v-model:visible="configModalVisible" />
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  nextTick,
  watch,
  onMounted,
  onUnmounted,
  defineAsyncComponent,
} from "vue";
import { message } from "ant-design-vue";
import {
  RobotOutlined,
  SettingOutlined,
  UserOutlined,
  BulbOutlined,
} from "@ant-design/icons-vue";
import { useGlobalStore } from "../core/globalStore";
import { createAIClient } from "../core/aiClient";
import { AIMessage } from "../core/ai.d";
import AIConfigModal from "./AIConfigModal.vue";

const MdViewer = defineAsyncComponent(() => import("./MdViewer.vue"));

const globalStore = useGlobalStore();

// 侧边栏状态
const visible = ref(false);
const configModalVisible = ref(false);

// 消息状态
const messages = ref<AIMessage[]>([]);
const inputText = ref("");
const loading = ref(false);
const streamingContent = ref("");
const messagesContainer = ref<HTMLElement | null>(null);

// 当前 SQL 和题目内容
const currentSQL = ref("");
const questionContent = ref("");
const currentResult = ref<any[]>([]);
const currentAnswerResult = ref<any[]>([]);
const currentErrorMsg = ref("");
const currentResultStatus = ref(-1);
const currentInitSQL = ref("");

// 是否已配置
const hasConfig = computed(() => {
  return globalStore.aiConfig && globalStore.aiConfig.apiKey;
});

// 切换侧边栏
const toggleSidebar = () => {
  console.log("Toggle sidebar clicked, current visible:", visible.value);
  visible.value = !visible.value;
};

// 打开配置
const openConfig = () => {
  configModalVisible.value = true;
};

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

// 构建系统提示
const getSystemPrompt = () => {
  let prompt =
    "你是一个 SQL 学习助手，专门帮助用户学习和理解 SQL。使用简洁明了的语言回答问题，适当使用代码示例。";

  // 题目内容
  if (questionContent.value) {
    prompt += `\n\n当前题目内容：\n${questionContent.value}`;
  }

  // 表结构信息
  if (currentInitSQL.value) {
    prompt += `\n\n数据库表结构（建表语句）：\n\`\`\`sql\n${currentInitSQL.value}\n\`\`\``;
  }

  // 用户的 SQL
  if (currentSQL.value) {
    prompt += `\n\n用户当前编写的 SQL：\n\`\`\`sql\n${currentSQL.value}\n\`\`\``;
  }

  // 执行结果对比
  if (currentResult.value && currentResult.value.length > 0) {
    prompt += `\n\n用户 SQL 的执行结果：\n${JSON.stringify(
      currentResult.value,
      null,
      2
    )}`;
  }

  if (currentAnswerResult.value && currentAnswerResult.value.length > 0) {
    prompt += `\n\n正确答案的执行结果：\n${JSON.stringify(
      currentAnswerResult.value,
      null,
      2
    )}`;
  }

  // 错误信息
  if (currentErrorMsg.value) {
    prompt += `\n\n执行错误信息：${currentErrorMsg.value}`;
  }

  // 结果状态提示
  if (currentResultStatus.value === 0) {
    prompt += `\n\n注意：用户的查询结果与正确答案不一致，请帮助分析差异。`;
  }

  return prompt;
};

// 快捷提示
const handleQuickPrompt = (prompt: string) => {
  inputText.value = prompt;
  handleSend();
};

// 应用 SQL 到编辑器
const applySQLToEditor = (sql: string) => {
  const event = new CustomEvent("updateEditorSQL", {
    detail: { sql },
  });
  window.dispatchEvent(event);
  message.success("已应用 SQL 到编辑器");
};

// 从消息中提取 SQL 代码
const extractSQLFromMessage = (content: string): string | null => {
  // 匹配 ```sql ... ``` 格式的代码块
  const sqlCodeBlockRegex = /```sql\s*\n([\s\S]*?)\n```/i;
  const match = content.match(sqlCodeBlockRegex);
  if (match && match[1]) {
    return match[1].trim();
  }
  return null;
};

// 发送消息
const handleSend = async () => {
  if (!inputText.value.trim() || loading.value) {
    return;
  }

  if (!hasConfig.value) {
    message.warning("请先配置 AI 助手");
    openConfig();
    return;
  }

  const userMessage: AIMessage = {
    role: "user",
    content: inputText.value.trim(),
  };

  messages.value.push(userMessage);
  inputText.value = "";
  loading.value = true;
  streamingContent.value = "";
  scrollToBottom();

  try {
    const client = createAIClient(globalStore.aiConfig!);

    const allMessages: AIMessage[] = [
      { role: "system", content: getSystemPrompt() },
      ...messages.value,
    ];

    const response = await client.chat(allMessages, (chunk) => {
      streamingContent.value += chunk;
      scrollToBottom();
    });

    if (response.success) {
      messages.value.push({
        role: "assistant",
        content: response.content,
      });
    } else {
      message.error(response.error || "AI 调用失败");
      messages.value.pop();
    }
  } catch (error: any) {
    message.error("发送失败：" + error.message);
    messages.value.pop();
  } finally {
    loading.value = false;
    streamingContent.value = "";
    scrollToBottom();
  }
};

// 清空对话
const handleClear = () => {
  messages.value = [];
  streamingContent.value = "";
};

// 监听外部事件更新上下文
const handleUpdateContext = (event: CustomEvent) => {
  if (event.detail) {
    currentSQL.value = event.detail.sql || "";
    questionContent.value = event.detail.content || "";
    currentResult.value = event.detail.result || [];
    currentAnswerResult.value = event.detail.answerResult || [];
    currentErrorMsg.value = event.detail.errorMsg || "";
    currentResultStatus.value = event.detail.resultStatus ?? -1;
    currentInitSQL.value = event.detail.initSQL || "";
  }
};

// 监听打开侧边栏事件
const handleOpenSidebar = () => {
  visible.value = true;
};

onMounted(() => {
  window.addEventListener(
    "updateAIContext",
    handleUpdateContext as EventListener
  );
  window.addEventListener("openAISidebar", handleOpenSidebar);
});

onUnmounted(() => {
  window.removeEventListener(
    "updateAIContext",
    handleUpdateContext as EventListener
  );
  window.removeEventListener("openAISidebar", handleOpenSidebar);
});
</script>

<style scoped>
.ai-trigger-btn {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 8px;
  border-radius: 8px 0 0 8px;
  cursor: pointer;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  writing-mode: vertical-rl;
}

.ai-trigger-btn:hover {
  padding-right: 12px;
  box-shadow: -4px 4px 12px rgba(0, 0, 0, 0.2);
}

.ai-trigger-btn.active {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

.ai-trigger-btn .btn-text {
  font-size: 12px;
  letter-spacing: 2px;
}

.no-config {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-config-content {
  text-align: center;
  padding: 40px;
}

.no-config-icon {
  font-size: 64px;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.no-config-content h3 {
  margin-bottom: 8px;
  color: var(--text-color);
}

.no-config-content p {
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 55px);
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.messages-container::-webkit-scrollbar {
  width: 6px;
}

.messages-container::-webkit-scrollbar-track {
  background: transparent;
  margin: 8px 0;
}

.messages-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.12);
  border-radius: 3px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

.empty-chat {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  color: #faad14;
  filter: drop-shadow(0 2px 8px rgba(250, 173, 20, 0.3));
}

.empty-chat p {
  margin-bottom: 8px;
  font-size: 15px;
}

.empty-chat .hint {
  font-size: 12px;
  opacity: 0.7;
}

.message {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 16px;
}

.message-user .message-avatar {
  background: var(--link-color);
  color: white;
}

.message-assistant .message-avatar {
  background: var(--component-bg);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.message-content {
  flex: 1;
  padding: 12px 16px;
  border-radius: 12px;
  word-wrap: break-word;
  overflow-x: auto;
}

.message-content::-webkit-scrollbar {
  height: 4px;
}

.message-content::-webkit-scrollbar-track {
  background: transparent;
}

.message-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 2px;
}

.message-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.25);
}

.message-assistant .message-content {
  background: var(--component-bg);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.message-user .message-content {
  background: var(--link-color);
  color: white;
}

.cursor-blink {
  animation: blink 1s infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

.quick-actions {
  padding: 12px 16px;
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  background: var(--card-bg);
}

.input-area {
  padding: 16px;
  border-top: 1px solid var(--border-color);
  background: var(--card-bg);
}

.send-btn {
  margin-top: 8px;
  width: 100%;
}

.input-hint {
  text-align: right;
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.sql-actions {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed var(--border-color);
}

/* 深色模式下滚动条优化 */
:global([data-theme="dark"] .messages-container::-webkit-scrollbar-thumb) {
  background: rgba(148, 163, 184, 0.35);
}

:global([data-theme="dark"]
    .messages-container::-webkit-scrollbar-thumb:hover) {
  background: rgba(148, 163, 184, 0.5);
}

:global([data-theme="dark"] .message-content::-webkit-scrollbar-thumb) {
  background: rgba(148, 163, 184, 0.3);
}

:global([data-theme="dark"] .message-content::-webkit-scrollbar-thumb:hover) {
  background: rgba(148, 163, 184, 0.45);
}

/* 深色模式下的整体优化 */
:global([data-theme="dark"] .empty-icon) {
  color: #ffc53d;
  filter: drop-shadow(0 2px 12px rgba(255, 197, 61, 0.5));
}

:global([data-theme="dark"] .empty-chat p) {
  color: rgba(229, 231, 235, 0.85);
}

:global([data-theme="dark"] .empty-chat .hint) {
  color: rgba(156, 163, 175, 0.8);
}

:global([data-theme="dark"] .message-assistant .message-content) {
  background: rgba(31, 41, 55, 0.6);
  border-color: rgba(71, 85, 105, 0.4);
  backdrop-filter: blur(8px);
}

:global([data-theme="dark"] .message-user .message-content) {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border: none;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

:global([data-theme="dark"] .message-assistant .message-avatar) {
  background: rgba(15, 23, 42, 0.8);
  border-color: rgba(71, 85, 105, 0.5);
}

:global([data-theme="dark"] .sql-actions) {
  border-top-color: rgba(71, 85, 105, 0.4);
}

:global([data-theme="dark"] .quick-actions) {
  background: rgba(15, 23, 42, 0.5);
  border-top-color: rgba(71, 85, 105, 0.4);
}

:global([data-theme="dark"] .input-area) {
  background: rgba(15, 23, 42, 0.5);
  border-top-color: rgba(71, 85, 105, 0.4);
}

:global([data-theme="dark"] .input-hint) {
  color: rgba(156, 163, 175, 0.7);
}

/* 深色模式下的触发按钮优化 */
:global([data-theme="dark"] .ai-trigger-btn) {
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
  box-shadow: -2px 2px 12px rgba(0, 0, 0, 0.4);
}

:global([data-theme="dark"] .ai-trigger-btn:hover) {
  box-shadow: -4px 4px 16px rgba(124, 58, 237, 0.4);
}

/* 深色模式下的 Ant Design 组件优化 */
:global([data-theme="dark"] .ai-sidebar-wrapper .ant-input),
:global([data-theme="dark"] .ai-sidebar-wrapper .ant-input-affix-wrapper) {
  background: rgba(17, 24, 39, 0.8) !important;
  border-color: rgba(71, 85, 105, 0.6) !important;
  color: var(--text-color) !important;
}

:global([data-theme="dark"] .ai-sidebar-wrapper .ant-input:hover),
:global([data-theme="dark"] .ai-sidebar-wrapper .ant-input:focus),
:global([data-theme="dark"] .ai-sidebar-wrapper .ant-input-affix-wrapper:hover),
:global([data-theme="dark"] .ai-sidebar-wrapper .ant-input-focused) {
  border-color: rgba(96, 165, 250, 0.8) !important;
  background: rgba(17, 24, 39, 0.95) !important;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15) !important;
}

:global([data-theme="dark"] .ai-sidebar-wrapper .ant-input::placeholder),
:global([data-theme="dark"] .ai-sidebar-wrapper textarea::placeholder) {
  color: rgba(156, 163, 175, 0.5) !important;
}

:global([data-theme="dark"] .ai-sidebar-wrapper .ant-btn) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:global([data-theme="dark"] .ai-sidebar-wrapper .ant-btn-default) {
  background: rgba(31, 41, 55, 0.8) !important;
  border-color: rgba(71, 85, 105, 0.6) !important;
  color: #e5e7eb !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

:global([data-theme="dark"]
    .ai-sidebar-wrapper
    .ant-btn-default:hover:not(:disabled)) {
  border-color: rgba(96, 165, 250, 0.8) !important;
  background: rgba(31, 41, 55, 0.95) !important;
  color: #93c5fd !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

:global([data-theme="dark"]
    .ai-sidebar-wrapper
    .ant-btn-default:hover:not(:disabled)) {
  border-color: rgba(96, 165, 250, 0.8) !important;
  background: rgba(31, 41, 55, 0.95) !important;
  color: #93c5fd !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

:global([data-theme="dark"] .ai-sidebar-wrapper .ant-btn-primary) {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
  border: none !important;
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
  font-weight: 500;
}

:global([data-theme="dark"]
    .ai-sidebar-wrapper
    .ant-btn-primary:hover:not(:disabled)) {
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%) !important;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
  transform: translateY(-1px);
}

:global([data-theme="dark"] .ai-sidebar-wrapper .ant-btn-dangerous),
:global([data-theme="dark"] .ai-sidebar-wrapper .ant-btn-danger) {
  background: rgba(220, 38, 38, 0.2) !important;
  border-color: rgba(239, 68, 68, 0.5) !important;
  color: #fca5a5 !important;
  box-shadow: 0 1px 3px rgba(220, 38, 38, 0.2);
}

:global([data-theme="dark"]
    .ai-sidebar-wrapper
    .ant-btn-dangerous:hover:not(:disabled)),
:global([data-theme="dark"]
    .ai-sidebar-wrapper
    .ant-btn-danger:hover:not(:disabled)) {
  background: rgba(220, 38, 38, 0.35) !important;
  border-color: rgba(239, 68, 68, 0.7) !important;
  color: #fecaca !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(220, 38, 38, 0.3);
}

/* 深色模式下的 Drawer 阴影优化 */
:global([data-theme="dark"] .ai-sidebar-wrapper .ant-drawer-content-wrapper) {
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.5) !important;
}

:global([data-theme="dark"] .ai-sidebar-wrapper .ant-drawer-header) {
  background: rgba(11, 18, 32, 0.95) !important;
  backdrop-filter: blur(10px);
}

:global([data-theme="dark"] .ai-sidebar-wrapper .ant-drawer-body) {
  background: rgba(15, 23, 42, 0.95) !important;
}

:global([data-theme="dark"] .ai-sidebar-wrapper .ant-drawer-title) {
  color: var(--text-color) !important;
}

/* 深色模式下消息内容中的 Markdown 样式优化 */
:global([data-theme="dark"] .message-content .markdown-body) {
  background: transparent;
}

:global([data-theme="dark"] .message-content .markdown-body code) {
  background: rgba(15, 23, 42, 0.6);
  color: #93c5fd;
  border: 1px solid rgba(71, 85, 105, 0.3);
}

:global([data-theme="dark"] .message-content .markdown-body pre) {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(71, 85, 105, 0.4);
}

:global([data-theme="dark"] .message-content .markdown-body pre code) {
  background: transparent;
  border: none;
}

:global([data-theme="dark"]
    .message-user
    .message-content
    .markdown-body
    code) {
  background: rgba(255, 255, 255, 0.2);
  color: #e0f2fe;
  border-color: rgba(255, 255, 255, 0.3);
}

:global([data-theme="dark"] .message-user .message-content .markdown-body pre) {
  background: rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
}

/* 深色模式下按钮状态优化 */
:global([data-theme="dark"] .ai-sidebar-wrapper .ant-btn-default:disabled),
:global([data-theme="dark"] .ai-sidebar-wrapper .ant-btn[disabled]) {
  background: rgba(31, 41, 55, 0.3) !important;
  border-color: rgba(71, 85, 105, 0.3) !important;
  color: rgba(156, 163, 175, 0.4) !important;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

:global([data-theme="dark"] .ai-sidebar-wrapper .ant-btn-primary:disabled),
:global([data-theme="dark"] .ai-sidebar-wrapper .ant-btn-primary[disabled]) {
  background: rgba(59, 130, 246, 0.25) !important;
  color: rgba(255, 255, 255, 0.4) !important;
  border: none !important;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* 快捷按钮区域额外优化 */
:global([data-theme="dark"] .quick-actions .ant-btn) {
  font-size: 13px;
  height: 32px;
  padding: 0 12px;
  border-radius: 6px;
}

:global([data-theme="dark"] .quick-actions .ant-btn-primary) {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%) !important;
}

:global([data-theme="dark"]
    .quick-actions
    .ant-btn-primary:hover:not(:disabled)) {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
}

:global([data-theme="dark"] .quick-actions .ant-btn-dangerous),
:global([data-theme="dark"] .quick-actions .ant-btn-danger) {
  background: rgba(220, 38, 38, 0.25) !important;
  border-color: rgba(239, 68, 68, 0.6) !important;
}

:global([data-theme="dark"]
    .quick-actions
    .ant-btn-dangerous:hover:not(:disabled)),
:global([data-theme="dark"]
    .quick-actions
    .ant-btn-danger:hover:not(:disabled)) {
  background: rgba(220, 38, 38, 0.4) !important;
  border-color: rgba(239, 68, 68, 0.8) !important;
}

/* 输入区域特别优化 */
:global([data-theme="dark"] .input-area .ant-input),
:global([data-theme="dark"] .input-area textarea.ant-input) {
  background: rgba(17, 24, 39, 0.9) !important;
  border: 1px solid rgba(71, 85, 105, 0.6) !important;
  border-radius: 8px;
  font-size: 14px;
  resize: none;
}

:global([data-theme="dark"] .input-area .send-btn) {
  border-radius: 8px;
  height: 40px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* SQL 操作按钮优化 */
:global([data-theme="dark"] .sql-actions .ant-btn-primary) {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
  border: none !important;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);
}

:global([data-theme="dark"] .sql-actions .ant-btn-primary:hover) {
  background: linear-gradient(135deg, #34d399 0%, #10b981 100%) !important;
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.4);
  transform: translateY(-1px);
}

/* 消息加载动画优化 */
:global([data-theme="dark"] .ai-sidebar-wrapper .ant-btn-loading-icon) {
  color: rgba(255, 255, 255, 0.8) !important;
}

/* 按钮点击效果 */
:global([data-theme="dark"]
    .ai-sidebar-wrapper
    .ant-btn:active:not(:disabled)) {
  transform: translateY(0) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;
}

/* 设置按钮特殊样式 */
:global([data-theme="dark"]
    .ai-sidebar-wrapper
    .ant-drawer-header
    .ant-btn-link) {
  color: #93c5fd !important;
}

:global([data-theme="dark"]
    .ai-sidebar-wrapper
    .ant-drawer-header
    .ant-btn-link:hover) {
  color: #60a5fa !important;
  background: rgba(59, 130, 246, 0.1) !important;
}

/* 确保文本域正确显示 */
:global([data-theme="dark"] .ai-sidebar-wrapper textarea.ant-input) {
  color: var(--text-color) !important;
  scrollbar-width: thin;
  scrollbar-color: rgba(148, 163, 184, 0.3) transparent;
}

:global([data-theme="dark"]
    .ai-sidebar-wrapper
    textarea.ant-input::-webkit-scrollbar) {
  width: 6px;
}

:global([data-theme="dark"]
    .ai-sidebar-wrapper
    textarea.ant-input::-webkit-scrollbar-thumb) {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 3px;
}

:global([data-theme="dark"]
    .ai-sidebar-wrapper
    textarea.ant-input::-webkit-scrollbar-thumb:hover) {
  background: rgba(148, 163, 184, 0.5);
}

/* 深色模式下未配置状态优化 */
:global([data-theme="dark"] .no-config-content h3) {
  color: #e5e7eb !important;
}

:global([data-theme="dark"] .no-config-content p) {
  color: rgba(156, 163, 175, 0.9) !important;
}

:global([data-theme="dark"] .no-config-icon) {
  color: #93c5fd !important;
  filter: drop-shadow(0 4px 12px rgba(147, 197, 253, 0.3));
}

:global([data-theme="dark"] .no-config-content .ant-btn-primary) {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
  border: none !important;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  font-size: 16px;
  height: 48px;
  padding: 0 32px;
}

:global([data-theme="dark"] .no-config-content .ant-btn-primary:hover) {
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%) !important;
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5);
  transform: translateY(-2px);
}
</style>
