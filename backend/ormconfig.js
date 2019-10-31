module.exports = {
  type: "sqlite",
  database: "db.sqlite",
  synchronize: true,
  entities:
    process.env.NODE_ENV === "production"
      ? ["build/entities/*.js"]
      : ["src/entities/*.ts"]
};
