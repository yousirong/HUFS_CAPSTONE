const mysql = require("mysql2/promise");

const sql = {
  pool(key, config) {
    let pool = null;
    return (req, res, next) => {
      if (pool !== null) {
        res[key] = pool;
        next();
      } else {
        pool = mysql.createPool({ ...config, multipleStatements: true });
        res[key] = pool;
        next();
      }
    };
  },
};

module.exports = { sql };
