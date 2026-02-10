<template>
  <div id="indexPage" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
    <aside class="level-sidebar" :class="{ collapsed: isSidebarCollapsed }">
      <div class="sidebar-header">
        <span v-if="!isSidebarCollapsed" class="sidebar-title">题目列表</span>
        <a-button type="text" class="toggle-btn" @click="toggleSidebar">
          <menu-fold-outlined v-if="!isSidebarCollapsed" />
          <menu-unfold-outlined v-else />
        </a-button>
      </div>

      <transition name="sidebar-fade" mode="out-in">
        <div v-if="!isSidebarCollapsed" key="full" class="sidebar-content">
          <div class="sidebar-group">
            <div class="group-title">主线关卡</div>
            <button
              v-for="(levelItem, index) in mainLevels"
              :key="levelItem.key"
              type="button"
              class="level-item"
              :class="{ active: isCurrentLevel(levelItem.key) }"
              @click="goToLevel(levelItem.key)"
            >
              <span class="level-index">{{ index + 1 }}</span>
              <span class="level-name">{{ levelItem.title }}</span>
            </button>
          </div>

          <div class="sidebar-group">
            <div class="group-title">自定义关卡</div>
            <button
              v-for="(levelItem, index) in customLevels"
              :key="levelItem.key"
              type="button"
              class="level-item"
              :class="{ active: isCurrentLevel(levelItem.key) }"
              @click="goToLevel(levelItem.key)"
            >
              <span class="level-index">C{{ index + 1 }}</span>
              <span class="level-name">{{ levelItem.title }}</span>
            </button>
          </div>
        </div>

        <div v-else key="mini" class="sidebar-mini">
          <button
            v-for="(levelItem, index) in mainLevels"
            :key="`mini-main-${levelItem.key}`"
            type="button"
            class="mini-item"
            :class="{ active: isCurrentLevel(levelItem.key) }"
            @click="goToLevel(levelItem.key)"
          >
            {{ index + 1 }}
          </button>
          <button
            v-for="(levelItem, index) in customLevels"
            :key="`mini-custom-${levelItem.key}`"
            type="button"
            class="mini-item"
            :class="{ active: isCurrentLevel(levelItem.key) }"
            @click="goToLevel(levelItem.key)"
          >
            C{{ index + 1 }}
          </button>
        </div>
      </transition>
    </aside>

    <section class="workspace">
      <div class="workspace-header">
        <div class="workspace-title-wrap">
          <h2 class="workspace-title">{{ level.title }}</h2>
          <a-tag :color="level.type === 'main' ? 'blue' : 'orange'">
            {{ level.type === "main" ? "主线" : "实战" }}
          </a-tag>
        </div>
      </div>

      <a-row :gutter="[16, 16]" class="workspace-grid">
        <a-col :lg="11" :xs="24">
          <question-board :level="level" :result-status="resultStatus" />
        </a-col>
        <a-col :lg="13" :xs="24">
          <sql-editor
            ref="sqlEditorRef"
            :level="level"
            :editor-style="{ height: '280px' }"
            :result-status="resultStatus"
            :on-submit="onSubmit"
          />
          <a-collapse v-model:active-key="activeKeys" style="margin-top: 16px">
            <a-collapse-panel
              key="result"
              header="查看执行结果"
              class="result-collapse-panel"
            >
              <sql-result
                :level="level"
                :result="result"
                :result-status="resultStatus"
                :answer-result="answerResult"
                :error-msg="errorMsgRef"
                style="margin-top: 16px"
              />
            </a-collapse-panel>
            <a-collapse-panel v-if="level.hint" key="hint" header="查看提示">
              <p>{{ level.hint }}</p>
            </a-collapse-panel>
            <a-collapse-panel key="ddl" header="查看建表语句">
              <code-editor
                :init-value="level.initSQL"
                :editor-style="{ minHeight: '400px' }"
                read-only
              />
            </a-collapse-panel>
            <a-collapse-panel key="answer" header="查看答案">
              <code-editor
                :init-value="level.answer"
                :editor-style="{ minHeight: '400px' }"
                read-only
              />
            </a-collapse-panel>
          </a-collapse>
        </a-col>
      </a-row>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import { QueryExecResult } from "sql.js";
import { allLevels, getLevelByKey } from "../levels";
import mainLevels from "../levels/mainLevels";
import customLevels from "../levels/customLevels";
import { checkResult } from "../core/result";

const SqlEditor = defineAsyncComponent(
  () => import("../components/SqlEditor.vue")
);
const QuestionBoard = defineAsyncComponent(
  () => import("../components/QuestionBoard.vue")
);
const SqlResult = defineAsyncComponent(
  () => import("../components/SqlResult.vue")
);
const CodeEditor = defineAsyncComponent(
  () => import("../components/CodeEditor.vue")
);

interface SqlEditorExpose {
  getCurrentSQL: () => string;
  setSQL: (sql: string) => void;
}

interface IndexPageProps {
  levelKey?: string;
}

const props = defineProps<IndexPageProps>();
const router = useRouter();
const isSidebarCollapsed = ref(false);
const level = computed(() => {
  if (props.levelKey) {
    return getLevelByKey(props.levelKey);
  }
  return allLevels[0];
});

const result = ref<QueryExecResult[]>([]);
const answerResult = ref<QueryExecResult[]>([]);
const errorMsgRef = ref<string>();
const resultStatus = ref<number>(-1);
const defaultActiveKeys = ["result"];
const activeKeys = ref([...defaultActiveKeys]);
const sqlEditorRef = ref<SqlEditorExpose | null>(null);

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const goToLevel = (levelKey: string) => {
  if (level.value.key === levelKey) {
    return;
  }
  router.push(`/learn/${levelKey}`);
};

const isCurrentLevel = (levelKey: string) => {
  return level.value.key === levelKey;
};

// 广播当前上下文给 AI 侧边栏
const broadcastContext = () => {
  const event = new CustomEvent("updateAIContext", {
    detail: {
      content: level.value.content,
      sql: sqlEditorRef.value?.getCurrentSQL() || "",
      result: result.value,
      answerResult: answerResult.value,
      errorMsg: errorMsgRef.value,
      resultStatus: resultStatus.value,
      initSQL: level.value.initSQL,
    },
  });
  window.dispatchEvent(event);
};

watch(
  level,
  () => {
    // 重置折叠面板状态
    activeKeys.value = [...defaultActiveKeys];
    // 广播初始上下文
    broadcastContext();
  },
  { immediate: true }
);

/**
 * 执行结果
 * @param sql
 * @param res
 * @param answerRes
 * @param errorMsg
 */
const onSubmit = (
  sql: string,
  res: QueryExecResult[],
  answerRes: QueryExecResult[],
  errorMsg?: string
) => {
  result.value = res;
  answerResult.value = answerRes;
  errorMsgRef.value = errorMsg;
  resultStatus.value = checkResult(res, answerRes);
  // 执行后广播最新上下文
  broadcastContext();
};

// 监听 AI 更新编辑器事件
const handleUpdateEditorSQL = (event: CustomEvent) => {
  if (event.detail && event.detail.sql && sqlEditorRef.value) {
    sqlEditorRef.value.setSQL(event.detail.sql);
    // 可选：自动运行新的 SQL
    // doSubmit();
  }
};

onMounted(() => {
  window.addEventListener(
    "updateEditorSQL",
    handleUpdateEditorSQL as EventListener
  );
});

onUnmounted(() => {
  window.removeEventListener(
    "updateEditorSQL",
    handleUpdateEditorSQL as EventListener
  );
});
</script>

<style scoped>
#indexPage {
  display: flex;
  gap: 16px;
  min-height: calc(100vh - 180px);
  align-items: flex-start;
}

.level-sidebar {
  width: 320px;
  min-width: 320px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: sticky;
  top: 24px;
  height: calc(100vh - 48px);
  max-height: calc(100vh - 48px);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    min-width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.level-sidebar.collapsed {
  width: 84px;
  min-width: 84px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-bottom: 1px solid var(--border-color);
  min-height: 48px;
}

.sidebar-title {
  color: var(--text-color);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
}

.toggle-btn {
  color: var(--text-color);
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.toggle-btn:hover {
  transform: scale(1.1);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  overscroll-behavior: contain;
  padding: 8px;
}

.sidebar-content::-webkit-scrollbar {
  width: 6px;
}

.sidebar-content::-webkit-scrollbar-track {
  background: transparent;
  margin: 4px 0;
}

.sidebar-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.12);
  border-radius: 3px;
}

.sidebar-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

.sidebar-group + .sidebar-group {
  margin-top: 14px;
}

.group-title {
  font-size: 12px;
  color: var(--muted-text);
  margin: 6px 8px;
  letter-spacing: 0.4px;
}

.level-item {
  width: 100%;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-color);
  border-radius: 8px;
  padding: 8px 10px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}

.level-item:hover {
  background: var(--bg-secondary);
  border-color: var(--border-color);
}

.level-item.active {
  border-color: var(--primary-color);
  background: rgba(22, 119, 255, 0.12);
}

.level-index {
  min-width: 30px;
  color: var(--muted-text);
  font-size: 12px;
  line-height: 1.6;
}

.level-name {
  color: var(--text-color);
  font-size: 13px;
  line-height: 1.4;
}

.sidebar-mini {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px;
}

.sidebar-mini::-webkit-scrollbar {
  width: 6px;
}

.sidebar-mini::-webkit-scrollbar-track {
  background: transparent;
  margin: 4px 0;
}

.sidebar-mini::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.12);
  border-radius: 3px;
}

.sidebar-mini::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

.mini-item {
  height: 30px;
  border: 1px solid var(--border-color);
  background: var(--card-bg);
  color: var(--text-color);
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mini-item:hover {
  border-color: var(--primary-color);
}

.mini-item.active {
  border-color: var(--primary-color);
  background: var(--primary-color);
  color: #fff;
}

.workspace {
  flex: 1;
  min-width: 0;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 侧边栏动画 */
.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-fade-enter-from {
  opacity: 0;
  transform: scale(0.95) translateX(-10px);
}

.sidebar-fade-leave-to {
  opacity: 0;
  transform: scale(0.95) translateX(10px);
}

.sidebar-fade-enter-to,
.sidebar-fade-leave-from {
  opacity: 1;
  transform: scale(1) translateX(0);
}

/* 深色模式下侧边栏滚动条优化 */
:global([data-theme="dark"] .sidebar-content::-webkit-scrollbar-thumb),
:global([data-theme="dark"] .sidebar-mini::-webkit-scrollbar-thumb) {
  background: rgba(148, 163, 184, 0.35);
}

:global([data-theme="dark"] .sidebar-content::-webkit-scrollbar-thumb:hover),
:global([data-theme="dark"] .sidebar-mini::-webkit-scrollbar-thumb:hover) {
  background: rgba(148, 163, 184, 0.5);
}

.workspace-header {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 12px;
  margin-bottom: 12px;
}

.workspace-title-wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.workspace-title {
  margin: 0;
  color: var(--text-color);
  font-size: 18px;
}

.workspace-grid {
  margin: 0;
}

.result-collapse-panel :deep(.ant-collapse-content-box) {
  padding: 0 !important;
}

@media (max-width: 1200px) {
  .level-sidebar {
    width: 280px;
    min-width: 280px;
  }
}

@media (max-width: 992px) {
  #indexPage {
    flex-direction: column;
    min-height: auto;
  }

  .level-sidebar,
  .level-sidebar.collapsed {
    width: 100%;
    min-width: 0;
    position: static;
    top: auto;
    height: auto;
    max-height: none;
  }

  .sidebar-content {
    max-height: 280px;
  }

  .sidebar-mini {
    flex-direction: row;
    flex-wrap: wrap;
    max-height: 200px;
  }

  .mini-item {
    min-width: 56px;
  }

  .workspace {
    padding: 12px;
  }
}
</style>
