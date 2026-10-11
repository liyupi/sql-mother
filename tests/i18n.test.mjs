import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createServer } from "vite";
import initSqlJs from "sql.js";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";

let server;
let i18n;
let lessons;
let allLevels;
let grading;

before(async () => {
  server = await createServer({
    configFile: false,
    optimizeDeps: { disabled: true },
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "error",
  });
  i18n = await server.ssrLoadModule("/src/i18n/index.ts");
  lessons = await server.ssrLoadModule("/src/i18n/lessons.ts");
  ({ allLevels } = await server.ssrLoadModule("/src/levels/index.ts"));
  grading = await server.ssrLoadModule("/src/core/result.ts");
});

after(async () => {
  delete globalThis.window;
  await server?.close();
});

test("Chinese is the default and changing language updates UI messages", () => {
  assert.equal(i18n.locale.value, "zh-CN");
  assert.equal(i18n.t("run"), "运行");
  i18n.setLocale("en");
  assert.equal(i18n.t("run"), "Run");
  assert.equal(i18n.t("queryError", { error: "syntax error" }), "SQL error: syntax error");
  i18n.setLocale("unsupported");
  assert.equal(i18n.locale.value, "zh-CN");
});

test("English covers every UI message with the same interpolation variables", () => {
  const { messages } = i18n;
  assert.deepEqual(Object.keys(messages.en).sort(), Object.keys(messages["zh-CN"]).sort());
  for (const key of Object.keys(messages["zh-CN"])) {
    assert.ok(messages.en[key].trim(), key);
    const variables = (text) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
    assert.deepEqual(variables(messages.en[key]), variables(messages["zh-CN"][key]), key);
  }
});

test("language preference persists and blocked storage does not break switching", () => {
  const saved = new Map();
  globalThis.window = { localStorage: {
    getItem: (key) => saved.get(key) ?? null,
    setItem: (key, value) => saved.set(key, value),
  } };
  i18n.setLocale("en");
  assert.equal(i18n.readStoredLocale(), "en");
  saved.set("sql-mother-locale", "unavailable-language");
  assert.equal(i18n.readStoredLocale(), "zh-CN");
  Object.defineProperty(window, "localStorage", {
    get() { throw new Error("Storage unavailable"); },
  });
  assert.doesNotThrow(() => i18n.setLocale("zh-CN"));
  assert.equal(i18n.readStoredLocale(), "zh-CN");
  delete globalThis.window;
});

test("missing UI translations fall back to the source message", () => {
  i18n.setLocale("en");
  const original = i18n.messages.en.showHint;
  try {
    i18n.messages.en.showHint = "";
    assert.equal(i18n.t("showHint"), i18n.messages["zh-CN"].showHint);
  } finally {
    i18n.messages.en.showHint = original;
  }
});

test("all 45 registered lessons have complete English content, titles and hints", () => {
  assert.equal(allLevels.length, 45);
  i18n.setLocale("en");
  for (const level of allLevels) {
    const translated = lessons.getLessonTranslation(level);
    assert.notEqual(translated.title, level.title, `${level.key}: title missing`);
    assert.notEqual(translated.content, level.content, `${level.key}: tutorial missing`);
    assert.match(translated.content, /^# .+/m, `${level.key}: heading missing`);
    if (level.type === "main") {
      assert.match(translated.content, /^## Exercise/m, `${level.key}: exercise missing`);
    }
    if (level.hint) assert.notEqual(translated.hint, level.hint, `${level.key}: hint missing`);
  }
});

test("translation preserves canonical SQL and Chinese content; missing lessons fall back", () => {
  const before = JSON.stringify(allLevels);
  i18n.setLocale("en");
  allLevels.forEach((level) => lessons.getLessonTranslation(level));
  assert.equal(JSON.stringify(allLevels), before);
  const newLevel = { key: "new-untranslated-level", title: "新关卡", content: "中文内容", hint: "中文提示" };
  assert.deepEqual(lessons.getLessonTranslation(newLevel), {
    title: newLevel.title, content: newLevel.content, hint: newLevel.hint,
  });
  i18n.setLocale("zh-CN");
  for (const level of allLevels) {
    assert.equal(lessons.getLessonTranslation(level).content, level.content);
  }
});

test("every reference answer still executes and passes the original grader in each language", async () => {
  const require = createRequire(import.meta.url);
  const wasmBinary = await readFile(require.resolve("sql.js/dist/sql-wasm.wasm"));
  const SQL = await initSqlJs({ wasmBinary });
  for (const code of ["zh-CN", "en"]) {
    i18n.setLocale(code);
    for (const level of allLevels) {
      const db = new SQL.Database();
      try {
        db.run(level.initSQL);
        const result = db.exec(level.answer);
        assert.ok(result[0], `${level.key}: no query result`);
        assert.equal(grading.checkResult(result, db.exec(level.answer)), grading.RESULT_STATUS_ENUM.SUCCEED, `${code}/${level.key}`);
      } finally {
        db.close();
      }
    }
  }
});
