const app = require("express")();
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dayjs = require("dayjs");
require("dayjs/locale/ko");
const database = require("./utils/database");
const config = require("./config");
const { name, version } = require("./package");
const httpServer = require("http").createServer(app);

if (config.middleware.cors) app.use(cors());
dayjs.locale("ko");
logger.token("date", () => dayjs().format("YYYY-MM-DD HH:mm:ss"));
app.use(logger(config.middleware.morgan));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(database.sql.pool("pool", config.mysql));

// RESTful API
app.use("/api", require("./routes/common"));

httpServer.listen(process.env.PORT || config.port, async () => {
  const startMessage = `The ${name}(${config.env}) starts at ${
    process.env.PORT || config.port
  }(${version})`;
  console.info(startMessage);
});

module.exports = { app, httpServer };
