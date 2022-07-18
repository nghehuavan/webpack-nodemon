const { Sequelize, QueryTypes } = require('sequelize');

// connect database sqlite in-memory by package sequelize
const db = new Sequelize('sqlite::memory:', { logging: false });
console.log('sqlite::memory:')
connectSqlite = async () => {
  try {
    await db.authenticate();
    const initSql = 'CREATE TABLE IF NOT EXISTS "subscriptions" ("key" TEXT NOT NULL, "data" TEXT, PRIMARY KEY ("key" ASC))';
    await db.query(initSql);
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
connectSqlite();

module.exports = {
  select: async (sql, options) => {
    return await db.query(sql, Object.assign(options ?? {}, { type: QueryTypes.SELECT }));
  },
  insert: async (sql, options) => {
    return await db.query(sql, Object.assign(options ?? {}, { type: QueryTypes.INSERT }));
  },
};
