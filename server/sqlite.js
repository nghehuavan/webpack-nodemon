const { Sequelize } = require('sequelize');

// connect database sqlite in-memory by package sequelize
connectSqlite = async () => {
  const db = new Sequelize('sqlite::memory:', { logging: false });
  try {
    await db.authenticate();
    const initSql = 'CREATE TABLE IF NOT EXISTS "subscriptions" ("key" TEXT NOT NULL, "data" TEXT, PRIMARY KEY ("key" ASC))';
    await db.query(initSql);
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return db;
};

module.exports = connectSqlite;
