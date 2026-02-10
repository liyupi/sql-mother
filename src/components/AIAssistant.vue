<template>
  <div class="ai-assistant">
    <div v-if="!hasConfig" class="no-config">
      <a-empty description="未配置 AI 助手">
        <template #image>
          <robot-outlined
            style="font-size: 48px; color: var(--text-secondary)"
          />
        </template>
        <a-button type="primary" @click="$emit('openConfig')">
          立即配置
        </a-button>
      </a-empty>
    </div>

    <div v-else class="chat-container">
      <!-- 消息列表 -->
      <div ref="messagesContainer" class="messages-container">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', `message-${msg.role}`]"
        >
          <div class="message-content">
            <div class="message-role">
              {{ msg.role === "user" ? "你" : "AI助手" }}
            </div>
            <div class="message-text">
              <md-viewer :value="msg.content" />
            </div>
          </div>
        </div>

        <div v-if="loading" class="message message-assistant">
          <div class="message-content">
            <div class="message-role">AI助手</div>
            <div class="message-text">
              <md-viewer :value="streamingContent || '正在思考...'" />
              <span class="cursor-blink">▋</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 快捷提示 -->
      <div class="quick-actions">
        <a-space wrap>
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
                '请帮我分析一下这个 SQL 语句：\\n```sql\\n' +
                  currentSQL +
                  '\\n```'
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
        </a-space>
      </div>

      <!-- 输入区域 -->
      <div class="input-area">
        <a-textarea
          v-model:value="inputText"
          placeholder="输入你的问题..."
          :auto-size="{ minRows: 2, maxRows: 4 }"
          @press-enter="handleSend"
        />
        <div class="input-actions">
          <a-button
            size="small"
            :disabled="messages.length === 0"
            @click="handleClear"
          >
            清空对话
          </a-button>
          <a-button
            type="primary"
            :loading="loading"
            :disabled="!inputText.trim()"
            @click="handleSend"
          >
            发送
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from "vue";
import { message } from "ant-design-vue";
import { RobotOutlined } from "@ant-design/icons-vue";
import { useGlobalStore } from "../core/globalStore";
import { createAIClient } from "../core/aiClient";
import { AIMessage } from "../core/ai.d";
import MdViewer from "./MdViewer.vue";

interface Props {
  currentSQL?: string;
  questionContent?: string;
}

interface Emits {
  (e: "openConfig"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const globalStore = useGlobalStore();

// 消息列表
const messages = ref<AIMessage[]>([]);
const inputText = ref("");
const loading = ref(false);
const streamingContent = ref("");
const messagesContainer = ref<HTMLElement | null>(null);

// 是否已配置
const hasConfig = computed(() => {
  return globalStore.aiConfig && globalStore.aiConfig.apiKey;
});

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
  let prompt = "你是一个 SQL 学习助手，专门帮助用户学习和理解 SQL。";

  if (props.questionContent) {
    prompt += `\\n\\n当前题目内容：\\n${props.questionContent}`;
  }

  if (props.currentSQL) {
    prompt += `\\n\\n用户当前编写的 SQL：\\n\`\`\`sql\\n${props.currentSQL}\\n\`\`\``;
  }

  prompt += "\\n\\n请用简洁明了的语言回答问题，适当使用代码示例。";

  return prompt;
};

// 快捷提示
const handleQuickPrompt = (prompt: string) => {
  inputText.value = prompt;
  handleSend();
};

// 发送消息
const handleSend = async () => {
  if (!inputText.value.trim() || loading.value) {
    return;
  }

  if (!hasConfig.value) {
    message.warning("请先配置 AI 助手");
    emit("openConfig");
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

    // 构建完整的消息列表（包含系统提示）
    const allMessages: AIMessage[] = [
      {
        role: "system",
        content: getSystemPrompt(),
      },
      ...messages.value,
    ];

    // 调用 AI，使用流式响应
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
      // 移除用户消息
      messages.value.pop();
    }
  } catch (error: any) {
    message.error("发送失败：" + error.message);
    // 移除用户消息
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

// 监听 SQL 变化
watch(
  () => props.currentSQL,
  () => {
    // SQL 变化时可以选择清空对话或保留
    // 这里选择保留，让用户可以继续讨论
  }
);
</script>

<style scoped>
.ai-assistant {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.no-config {
  padding: 40px 20px;
  text-align: center;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 500px;
  background: var(--bg-color);
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: var(--bg-secondary);
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

.message {
  margin-bottom: 16px;
}

.message-content {
  display: inline-block;
  max-width: 80%;
}

.message-user .message-content {
  float: right;
  text-align: right;
}

.message-assistant .message-content {
  float: left;
}

.message-role {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.message-text {
  background: var(--component-bg);
  padding: 8px 12px;
  border-radius: 8px;
  word-wrap: break-word;
}

.message-user .message-text {
  background: var(--primary-color);
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
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-color);
}

.input-area {
  padding: 16px;
  background: var(--bg-color);
}

.input-actions {
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* 清除浮动 */
.message::after {
  content: "";
  display: table;
  clear: both;
}

/* 深色模式下滚动条优化 */
:global([data-theme="dark"] .messages-container::-webkit-scrollbar-thumb) {
  background: rgba(148, 163, 184, 0.35);
}

:global([data-theme="dark"]
    .messages-container::-webkit-scrollbar-thumb:hover) {
  background: rgba(148, 163, 184, 0.5);
}
</style>
