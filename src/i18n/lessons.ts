import { locale } from "./index";

type LessonText = Pick<LevelType, "title" | "content" | "hint">;

// Keep translations next to their source lesson without changing its SQL.
const definitions = import.meta.glob<LevelType>(
  ["../levels/main/*/index.ts", "../levels/custom/*/index.ts"],
  { eager: true, import: "default" }
);
const contents = import.meta.glob("../levels/**/locales/*.md", {
  eager: true,
  as: "raw",
});
const metadata = import.meta.glob<Pick<LessonText, "title" | "hint">>(
  "../levels/**/locales/*.json",
  { eager: true, import: "default" }
);

const paths = new Map(
  Object.entries(definitions).map(([path, level]) => [
    level.key,
    path.replace(/\/index\.ts$/, "/locales/"),
  ])
);

export const getLessonTranslation = (level: LevelType): LessonText => {
  const path = `${paths.get(level.key)}${locale.value}`;
  const translated = metadata[`${path}.json`];
  return {
    title: translated?.title || level.title,
    content: contents[`${path}.md`] || level.content,
    hint: translated?.hint || level.hint,
  };
};
