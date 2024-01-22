import initSqlJs, { Database, SqlJsStatic } from "sql.js";

/**
 * SQL 执行器
 *
 * @author coder_yupi https://github.com/liyupi
 */
let SQL: SqlJsStatic;

// 可以直接远程加载 db 文件
// const buf = await fetch("/sql1.db").then((res) => res.arrayBuffer());
// const db = new SQL.Database(new Uint8Array(buf));

/**
 * 获取初始化 DB
 * @param initSql
 */
export const initDB = async (initSql?: string) => {
  if (!SQL) {
    SQL = await initSqlJs({
      // Required to load the wasm binary asynchronously
      locateFile: () => "./sql-wasm.wasm",
    });
  }
  // Create a database
  const db = new SQL.Database();
  if (initSql) {
    // Execute a single SQL string that contains multiple statements
    db.run(initSql); // Run the query without returning anything
  }
  return db;
};

/**
 * 执行 SQL
 * @param db
 * @param sql
 */
export const runSQL = (db: Database, sql: string) => {
  return db.exec(sql);
};
