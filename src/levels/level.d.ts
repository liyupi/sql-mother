/**
 * 关卡类型
 */
interface LevelType {
  // 关卡唯一键，用于加载不同的关卡内容和初始化 db
  key: string;
  // 关卡标题
  title: string;
  // 内容
  content: string;
  // 初始化 SQL
  initSQL: string;
  // 输入框默认 SQL
  defaultSQL: string;
  // 提示
  hint?: string;
  // 答案 SQL
  answer: string;
  // 类型（主线或自定义）
  type: "main" | "custom";
}
