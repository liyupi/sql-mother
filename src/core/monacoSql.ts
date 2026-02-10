type MonacoApi = typeof import("monaco-editor/esm/vs/editor/editor.api");

let sqlLanguageReady = false;
let preparingSqlLanguage: Promise<void> | null = null;

export const ensureMonacoSqlLanguage = async (monaco: MonacoApi) => {
  if (sqlLanguageReady) {
    return;
  }
  if (preparingSqlLanguage) {
    return preparingSqlLanguage;
  }

  preparingSqlLanguage = (async () => {
    const sqlLang = await import(
      "monaco-editor/esm/vs/basic-languages/sql/sql"
    );
    const hasSqlLanguage = monaco.languages
      .getLanguages()
      .some((language) => language.id === "sql");

    if (!hasSqlLanguage) {
      monaco.languages.register({ id: "sql" });
    }

    monaco.languages.setMonarchTokensProvider("sql", sqlLang.language as any);
    monaco.languages.setLanguageConfiguration("sql", sqlLang.conf);
    sqlLanguageReady = true;
  })().finally(() => {
    preparingSqlLanguage = null;
  });

  return preparingSqlLanguage;
};
