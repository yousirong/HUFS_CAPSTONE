const dotEnv = require("dotenv");
const queryString = require("querystring");

if (process.env.NODE_ENV !== "production") dotEnv.config();

const dataBase = queryString.parse(process.env.DATABASE);

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mysql: {
    host: dataBase.host,
    user: dataBase.user,
    password: dataBase.password,
    database: dataBase.name,
    port: Number(dataBase.port),
    connectionLimit: Number(dataBase.connectionlimit),
  },
  jwt: {
    privateKey: process.env.JWT_SECRET_KEY,
    algorithm: process.env.JWT_ALGORITHM,
    issuer: process.env.JWT_ISSUER,
  },
  middleware: {
    cors: true,
    morgan: `:date[iso][:status][:method] :url :response-time ms :res[content-length] bytes`,
    result: `json`,
  },
};
