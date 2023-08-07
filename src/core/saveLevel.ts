const levelStorage = "learnLevel";

export const saveLevel = (level: string) => {
  // 保存代码
  localStorage.setItem(levelStorage, level);
};

export const readLevel = () => {
  // 读取代码
  return localStorage.getItem(levelStorage);
};

export const deleteLevel = () => {
  // 删除代码
  localStorage.removeItem(levelStorage);
};
