<template>
  <div id="levelsPage">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">⚔️ 关卡挑战</h1>
      <p class="page-description">选择你的挑战关卡，开始SQL学习之旅！</p>
    </div>

    <!-- 关卡内容 -->
    <a-row :gutter="[24, 24]" class="levels-content">
      <!-- 主线关卡 -->
      <a-col :xs="24" :lg="12">
        <div class="level-section">
          <div class="section-header">
            <h2 class="section-title">
              🎯 主线关卡
              <a-tag color="blue" size="small">基础必修</a-tag>
            </h2>
          </div>
          
          <div class="level-grid">
            <div 
              v-for="(level, index) in mainLevels" 
              :key="level.key"
              class="level-card main-level"
              @click="goToLevel(level.key)"
            >
              <div class="level-number">{{ index + 1 }}</div>
              <div class="level-content">
                <h3 class="level-title">{{ level.title }}</h3>
                <div class="level-meta">
                  <a-tag color="blue" size="small">主线</a-tag>
                  <span class="level-difficulty">⭐ 基础</span>
                </div>
              </div>
              <div class="level-action">
                <a-button type="primary" size="small">挑战</a-button>
              </div>
            </div>
          </div>
        </div>
      </a-col>

      <!-- 自定义关卡 -->
      <a-col :xs="24" :lg="12">
        <div class="level-section">
          <div class="section-header">
            <h2 class="section-title">
              🌟 自定义关卡
              <a-tag color="orange" size="small">实战进阶</a-tag>
            </h2>
          </div>
          
          <div class="level-grid">
            <div 
              v-for="level in customLevels" 
              :key="level.key"
              class="level-card custom-level"
              @click="goToLevel(level.key)"
            >
              <div class="level-content">
                <h3 class="level-title">{{ level.title }}</h3>
                <div class="level-meta">
                  <a-tag color="orange" size="small">实战</a-tag>
                  <span class="level-difficulty">{{ getDifficultyText(level.difficulty) }}</span>
                </div>
              </div>
              <div class="level-action">
                <a-button type="primary" size="small">挑战</a-button>
              </div>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import mainLevels from "../levels/mainLevels";
import customLevels from "../levels/customLevels";

const router = useRouter();

const goToLevel = (levelKey: string) => {
  router.push(`/learn/${levelKey}`);
};


const getDifficultyText = (difficulty?: number) => {
  switch (difficulty) {
    case 1:
      return '⭐ 简单';
    case 2:
      return '⭐⭐ 中等';
    case 3:
      return '⭐⭐⭐ 困难';
    default:
      return '⭐⭐ 中等';
  }
};
</script>

<style scoped>
#levelsPage {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
}

/* 页面标题 */
.page-header {
  text-align: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #1f2937;
}

.page-description {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

/* 关卡内容 */
.levels-content {
  margin-bottom: 24px;
}

.level-section {
  height: 100%;
}

.section-header {
  margin-bottom: 16px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0;
  color: #1f2937;
}

/* 关卡网格 */
.level-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.level-card {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.level-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

.main-level:hover {
  border-color: #3b82f6;
}

.custom-level:hover {
  border-color: #f59e0b;
}

/* 主线关卡样式 */
.main-level .level-number {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  margin-right: 12px;
  flex-shrink: 0;
}

/* 自定义关卡样式 */
.custom-level .level-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-right: 12px;
  flex-shrink: 0;
}

.level-content {
  flex: 1;
  min-width: 0;
}

.level-title {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 6px 0;
  color: #1f2937;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.level-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.level-difficulty {
  font-size: 12px;
  color: #6b7280;
}

.level-action {
  margin-left: 12px;
  flex-shrink: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  #levelsPage {
    padding: 0 12px;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .section-title {
    font-size: 18px;
  }
  
  .level-card {
    padding: 10px 12px;
  }
  
  .level-title {
    font-size: 14px;
  }
  
  .main-level .level-number,
  .custom-level .level-icon {
    width: 28px;
    height: 28px;
    margin-right: 10px;
  }
  
  .main-level .level-number {
    font-size: 12px;
  }
  
  .custom-level .level-icon {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .level-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .level-action {
    margin-left: 8px;
  }
}

/* 大屏优化 */
@media (min-width: 1200px) {
  .level-grid {
    max-height: 70vh;
    overflow-y: auto;
    padding-right: 8px;
  }
  
  .level-grid::-webkit-scrollbar {
    width: 4px;
  }
  
  .level-grid::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }
  
  .level-grid::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
  }
  
  .level-grid::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .level-card {
    background: #1f2937;
    border-color: #374151;
    color: #f9fafb;
  }
  
  .level-title {
    color: #f9fafb;
  }
  
  .section-title {
    color: #f9fafb;
  }
  
  .page-title {
    color: #f9fafb;
  }
}

/* 触摸设备优化 */
@media (hover: none) {
  .level-card {
    transition: none;
  }
  
  .level-card:active {
    transform: scale(0.98);
  }
}
</style>
