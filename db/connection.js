const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "rafli",
  database: "sim",
});

module.exports = client;
