<template>
  <div id="levelsPage">
    <div class="page-header">
      <h1 class="page-title">关卡登峰图</h1>
      <p class="page-description">
        主线沿山脊攀登，支线如营地分布。选好下一站，继续冲顶。
      </p>
    </div>

    <div class="journey-layout">
      <section class="mountain-panel">
        <div class="section-header">
          <h2 class="section-title">
            主线攀登路线
            <a-tag color="blue" size="small">{{ mainLevels.length }} 关</a-tag>
          </h2>
          <p class="section-subtitle">从山脚到峰顶，按路线逐步提升 SQL 能力</p>
        </div>

        <div ref="mountainViewportRef" class="mountain-map-viewport">
          <div class="mountain-map" :style="{ height: `${mainTrackHeight}px` }">
            <svg
              class="mountain-track"
              :viewBox="`0 0 100 ${mainTrackHeight}`"
              preserveAspectRatio="none"
            >
              <path :d="mainTrackPath" class="track-base" />
              <path :d="mainTrackPath" class="track-highlight" />
            </svg>

            <button
              v-for="node in mainTrackNodes"
              :key="node.level.key"
              type="button"
              class="main-node"
              :style="{ left: `${node.x}%`, top: `${node.y}px` }"
              @click="goToLevel(node.level.key)"
            >
              <span class="node-index">{{ node.index + 1 }}</span>
              <span class="node-title">{{ node.level.title }}</span>
              <span class="node-meta">海拔 {{ node.altitude }}m</span>
            </button>

            <div class="trail-marker trail-end">
              峰顶 · Level {{ mainLevels.length }}
            </div>
            <div class="trail-marker trail-start">山脚 · Level 1</div>
          </div>
        </div>
      </section>

      <section class="branch-panel">
        <div class="section-header">
          <h2 class="section-title">
            自定义支线
            <a-tag color="orange" size="small"
              >{{ customLevels.length }} 关</a-tag
            >
          </h2>
          <p class="section-subtitle">根据题材选择实战营地，补齐你的技能树</p>
        </div>

        <div class="branch-grid">
          <button
            v-for="(level, index) in customLevels"
            :key="level.key"
            type="button"
            class="branch-node"
            @click="goToLevel(level.key)"
          >
            <span class="branch-badge">C{{ index + 1 }}</span>
            <span class="branch-title">{{ level.title }}</span>
            <span class="branch-difficulty">{{
              getDifficultyText(level.difficulty)
            }}</span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import mainLevels from "../levels/mainLevels";
import customLevels from "../levels/customLevels";

const router = useRouter();
const mountainViewportRef = ref<HTMLDivElement>();

const goToLevel = (levelKey: string) => {
  router.push(`/learn/${levelKey}`);
};

const getDifficultyText = (difficulty?: number) => {
  switch (difficulty) {
    case 1:
      return "简单";
    case 2:
      return "中等";
    case 3:
      return "困难";
    default:
      return "综合";
  }
};

const TRACK_TOP_PADDING = 96;
const TRACK_BOTTOM_PADDING = 96;
const TRACK_VERTICAL_STEP = 106;
const TRACK_X_PATTERN = [18, 33, 52, 41, 25, 48, 68, 55] as const;

interface MainTrackNode {
  level: LevelType;
  index: number;
  x: number;
  y: number;
  altitude: number;
}

const mainTrackNodes = computed<MainTrackNode[]>(() => {
  return mainLevels.map((level, index) => {
    const reverseIndex = mainLevels.length - index - 1;
    const baseX = TRACK_X_PATTERN[index % TRACK_X_PATTERN.length];
    const sway = Math.sin(index * 0.86) * 6;
    const x = Math.max(14, Math.min(82, baseX + sway));
    const y = TRACK_TOP_PADDING + reverseIndex * TRACK_VERTICAL_STEP;
    return {
      level,
      index,
      x,
      y,
      altitude: 1200 + index * 90,
    };
  });
});

const mainTrackHeight = computed(() => {
  return (
    TRACK_TOP_PADDING +
    TRACK_BOTTOM_PADDING +
    (mainLevels.length - 1) * TRACK_VERTICAL_STEP
  );
});

const mainTrackPath = computed(() => {
  const nodes = mainTrackNodes.value;
  if (nodes.length === 0) {
    return "";
  }
  let path = `M ${nodes[0].x} ${nodes[0].y}`;
  for (let i = 1; i < nodes.length; i += 1) {
    const prev = nodes[i - 1];
    const current = nodes[i];
    const controlY = (prev.y + current.y) / 2;
    path += ` C ${prev.x} ${controlY}, ${current.x} ${controlY}, ${current.x} ${current.y}`;
  }
  return path;
});

const resetTrackScroll = async () => {
  await nextTick();
  const viewport = mountainViewportRef.value;
  if (!viewport) {
    return;
  }
  viewport.scrollTop = viewport.scrollHeight - viewport.clientHeight;
};

onMounted(() => {
  resetTrackScroll();
});
</script>

<style scoped>
#levelsPage {
  --levels-panel-height: min(72vh, 760px);
  max-width: 1440px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 18px;
}

.page-title {
  margin: 0;
  font-size: clamp(30px, 4vw, 42px);
  letter-spacing: 0.8px;
  color: var(--text-color);
  font-family: "Trebuchet MS", "Avenir Next", "PingFang SC", "Microsoft YaHei",
    sans-serif;
}

.page-description {
  margin: 8px 0 0;
  color: var(--muted-text);
  font-size: 14px;
}

.journey-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.65fr) minmax(280px, 1fr);
  gap: 16px;
  align-items: start;
  margin-bottom: 16px;
}

.mountain-panel,
.branch-panel {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 16px;
  position: relative;
}

.mountain-panel {
  overflow: hidden;
  isolation: isolate;
}

.mountain-panel::after {
  content: "";
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 10px;
  height: 220px;
  background: radial-gradient(
      circle at 26% 74%,
      rgba(59, 130, 246, 0.3),
      transparent 62%
    ),
    radial-gradient(
      circle at 78% 32%,
      rgba(14, 165, 233, 0.26),
      transparent 60%
    );
  opacity: 0.4;
  z-index: 0;
  pointer-events: none;
}

.section-header {
  margin-bottom: 12px;
  position: relative;
  z-index: 2;
}

.section-title {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 22px;
  color: var(--text-color);
}

.section-subtitle {
  margin: 6px 0 0;
  color: var(--muted-text);
  font-size: 13px;
}

.mountain-map-viewport {
  height: var(--levels-panel-height);
  border-radius: 14px;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid rgba(59, 130, 246, 0.22);
  background: radial-gradient(
      circle at 18% 84%,
      rgba(37, 99, 235, 0.2),
      transparent 52%
    ),
    radial-gradient(
      circle at 80% 14%,
      rgba(14, 165, 233, 0.16),
      transparent 42%
    ),
    linear-gradient(
      180deg,
      rgba(191, 219, 254, 0.34) 0%,
      rgba(255, 255, 255, 0.08) 36%,
      rgba(255, 255, 255, 0) 100%
    );
  position: relative;
  z-index: 2;
}

.mountain-map-viewport::-webkit-scrollbar {
  width: 8px;
}

.mountain-map-viewport::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.45);
  border-radius: 999px;
}

.mountain-map {
  position: relative;
  width: 100%;
  min-height: 100%;
}

.mountain-track {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.track-base {
  fill: none;
  stroke: rgba(15, 23, 42, 0.16);
  stroke-width: 1.8;
  stroke-dasharray: 2 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.track-highlight {
  fill: none;
  stroke: #3b82f6;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.9;
}

.main-node {
  position: absolute;
  transform: translate(-50%, -50%);
  width: clamp(170px, 20vw, 222px);
  border: 1px solid rgba(59, 130, 246, 0.36);
  border-radius: 14px;
  padding: 10px 12px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.94),
    rgba(239, 246, 255, 0.88)
  );
  color: #0f172a;
  text-align: left;
  display: grid;
  gap: 5px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  z-index: 2;
}

.main-node:hover {
  transform: translate(-50%, -53%);
  border-color: rgba(37, 99, 235, 0.8);
  box-shadow: 0 12px 20px rgba(37, 99, 235, 0.25);
}

.main-node:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

.node-index {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(140deg, #2563eb, #1d4ed8);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
}

.node-title {
  font-size: 14px;
  font-weight: 650;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.node-meta {
  font-size: 12px;
  color: #475569;
}

.trail-marker {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(30, 64, 175, 0.9);
  color: #fff;
  font-size: 12px;
  letter-spacing: 0.3px;
  z-index: 2;
}

.trail-start {
  bottom: 18px;
}

.trail-end {
  top: 16px;
}

.branch-panel {
  background: linear-gradient(
      180deg,
      rgba(251, 191, 36, 0.14) 0%,
      rgba(251, 191, 36, 0.02) 38%,
      transparent 100%
    ),
    var(--card-bg);
}

.branch-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  max-height: var(--levels-panel-height);
  overflow-y: auto;
  padding-right: 4px;
}

.branch-grid::-webkit-scrollbar {
  width: 6px;
}

.branch-grid::-webkit-scrollbar-track {
  background: transparent;
  margin: 4px 0;
}

.branch-grid::-webkit-scrollbar-thumb {
  background: rgba(249, 115, 22, 0.25);
  border-radius: 3px;
}

.branch-grid::-webkit-scrollbar-thumb:hover {
  background: rgba(249, 115, 22, 0.4);
}

.branch-node {
  border: 1px solid rgba(249, 115, 22, 0.28);
  border-radius: 12px;
  padding: 10px 12px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95),
    rgba(255, 247, 237, 0.86)
  );
  color: #111827;
  text-align: left;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  row-gap: 2px;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.branch-node:hover {
  transform: translateY(-2px);
  border-color: rgba(249, 115, 22, 0.62);
  box-shadow: 0 8px 14px rgba(249, 115, 22, 0.2);
}

.branch-node:focus-visible {
  outline: 2px solid #ea580c;
  outline-offset: 2px;
}

.branch-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  height: 24px;
  border-radius: 999px;
  background: #f97316;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  grid-row: 1 / span 2;
}

.branch-title {
  font-size: 14px;
  font-weight: 650;
  line-height: 1.4;
}

.branch-difficulty {
  font-size: 12px;
  color: #64748b;
}

@media (max-width: 1200px) {
  .journey-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  #levelsPage {
    --levels-panel-height: 68vh;
  }

  .page-title {
    font-size: 32px;
  }

  .section-title {
    font-size: 20px;
  }

  .main-node {
    width: min(74vw, 206px);
    padding: 9px 10px;
  }

  .node-title {
    font-size: 13px;
  }
}

@media (max-width: 520px) {
  #levelsPage {
    --levels-panel-height: 64vh;
  }

  .node-index {
    width: 27px;
    height: 27px;
    font-size: 12px;
  }

  .trail-marker {
    font-size: 11px;
    padding: 3px 8px;
  }
}

:global([data-theme="dark"] .mountain-panel),
:global([data-theme="dark"] .branch-panel) {
  border-color: rgba(148, 163, 184, 0.32);
  box-shadow: inset 0 1px 0 rgba(148, 163, 184, 0.08);
}

:global([data-theme="dark"] .mountain-panel::after) {
  background: radial-gradient(
      circle at 26% 74%,
      rgba(59, 130, 246, 0.26),
      transparent 62%
    ),
    radial-gradient(circle at 78% 32%, rgba(14, 165, 233, 0.2), transparent 60%);
  opacity: 0.34;
}

:global([data-theme="dark"] .page-description),
:global([data-theme="dark"] .section-subtitle),
:global([data-theme="dark"] .node-meta),
:global([data-theme="dark"] .branch-difficulty) {
  color: rgba(203, 213, 225, 0.78);
}

:global([data-theme="dark"] .mountain-map-viewport) {
  border-color: rgba(96, 165, 250, 0.36);
  background: radial-gradient(
      circle at 18% 84%,
      rgba(59, 130, 246, 0.34),
      transparent 54%
    ),
    radial-gradient(
      circle at 80% 16%,
      rgba(14, 165, 233, 0.24),
      transparent 40%
    ),
    linear-gradient(180deg, rgba(30, 41, 59, 0.86), rgba(15, 23, 42, 0.88));
}

:global([data-theme="dark"] .mountain-map-viewport::-webkit-scrollbar-thumb) {
  background: rgba(96, 165, 250, 0.58);
}

:global([data-theme="dark"]
    .mountain-map-viewport::-webkit-scrollbar-thumb:hover) {
  background: rgba(96, 165, 250, 0.75);
}

:global([data-theme="dark"] .branch-grid::-webkit-scrollbar-thumb) {
  background: rgba(251, 146, 60, 0.4);
}

:global([data-theme="dark"] .branch-grid::-webkit-scrollbar-thumb:hover) {
  background: rgba(251, 146, 60, 0.55);
}

:global([data-theme="dark"] .track-base) {
  stroke: rgba(226, 232, 240, 0.26);
}

:global([data-theme="dark"] .track-highlight) {
  stroke: #60a5fa;
  opacity: 0.95;
}

:global([data-theme="dark"] .main-node) {
  border-color: rgba(96, 165, 250, 0.54);
  background: linear-gradient(
    135deg,
    rgba(30, 41, 59, 0.92),
    rgba(15, 23, 42, 0.9)
  );
  color: #e2e8f0;
  box-shadow: 0 8px 18px rgba(2, 6, 23, 0.42);
}

:global([data-theme="dark"] .main-node:hover) {
  border-color: rgba(147, 197, 253, 0.86);
  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.32);
}

:global([data-theme="dark"] .main-node:focus-visible) {
  outline-color: #93c5fd;
}

:global([data-theme="dark"] .node-index) {
  background: linear-gradient(140deg, #3b82f6, #2563eb);
  box-shadow: 0 0 0 1px rgba(191, 219, 254, 0.28);
}

:global([data-theme="dark"] .trail-marker) {
  background: rgba(30, 58, 138, 0.82);
  color: #dbeafe;
  border: 1px solid rgba(147, 197, 253, 0.36);
}

:global([data-theme="dark"] .branch-panel) {
  background: linear-gradient(
      180deg,
      rgba(249, 115, 22, 0.18) 0%,
      rgba(249, 115, 22, 0.04) 38%,
      transparent 100%
    ),
    var(--card-bg);
}

:global([data-theme="dark"] .branch-node) {
  border-color: rgba(251, 146, 60, 0.5);
  background: linear-gradient(
    135deg,
    rgba(60, 41, 19, 0.45),
    rgba(31, 24, 18, 0.34)
  );
  color: #f8fafc;
}

:global([data-theme="dark"] .branch-node:hover) {
  border-color: rgba(251, 146, 60, 0.78);
  box-shadow: 0 10px 16px rgba(194, 65, 12, 0.32);
}

:global([data-theme="dark"] .branch-node:focus-visible) {
  outline-color: #fb923c;
}

:global([data-theme="dark"] .branch-badge) {
  background: linear-gradient(140deg, #fb923c, #ea580c);
  color: #fff7ed;
}
</style>
