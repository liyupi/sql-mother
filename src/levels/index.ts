import mainLevels from "./mainLevels";
import customLevels from "./customLevels";

/**
 * 全部关卡
 */
export const allLevels = [...mainLevels, ...customLevels];

/**
 * 根据 key 获取关卡
 * @param levelKey
 */
export const getLevelByKey = (levelKey: string) => {
  return (
    allLevels.find((level) => {
      return level.key === levelKey;
    }) || allLevels[0]
  );
};

/**
 * 获取当前关卡位置
 * @param currentLevel
 */
export const getCurrentLevelNum = (currentLevel: LevelType) => {
  return allLevels.findIndex(
    (level: LevelType) => level.key === currentLevel.key
  );
};

/**
 * 上一关
 *
 * @param currentLevel
 */
export const getPrevLevel = (currentLevel: LevelType) => {
  const num = getCurrentLevelNum(currentLevel);
  if (num <= 0) {
    return;
  }
  return allLevels[num - 1];
};

/**
 * 下一关
 *
 * @param currentLevel
 */
export const getNextLevel = (currentLevel: LevelType) => {
  const num = getCurrentLevelNum(currentLevel);
  if (num >= allLevels.length - 1) {
    return;
  }
  return allLevels[num + 1];
};
