const codeStorage = "saveCode";
const isSaveCodeStorage = "isSaveCode";

export const saveCode = (code: string) => {
  // 保存代码
  localStorage.setItem(codeStorage, code);
};

export const readCode = () => {
  // 读取代码
  return localStorage.getItem(codeStorage);
};

export const deleteCode = () => {
  // 删除代码
  localStorage.removeItem(codeStorage);
};

export const setIsSaveCode = (isSaveCode: boolean) => {
  // 设置是否保存代码
  if (isSaveCode) {
    localStorage.setItem(isSaveCodeStorage, "true");
    return;
  }
  localStorage.setItem(isSaveCodeStorage, "false");
};

export const getIsSaveCode = () => {
  // 读取是否保存代码
  if (localStorage.getItem(isSaveCodeStorage) == "true") {
    return true;
  } else if (localStorage.getItem(isSaveCodeStorage) == "false") {
    return false;
  }
  return true; //因为默认是true，localStorage里没有的就是没有执行过更改状态的，所以没有执行过修改的一定是true（默认），所以返回true
};

export const deleteIsSaveCode = () => {
  // 删除是否保存代码
  localStorage.removeItem(isSaveCodeStorage);
};
