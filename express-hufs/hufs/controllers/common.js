const { env } = require("../config");
const { name, version } = require("../package");

const controller = {
  async ping(req, res, next) {
    try {
      res.json({
        status: "success",
        env,
        name,
        version,
      });
    } catch (err) {
      console.error(err);
    }
  },
  async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const [results] = await res.pool.query(
        `
        SELECT
        user_no AS 'user_no'
        FROM users
        WHERE enabled = 1
        AND email = ?
        AND password = PASSWORD(?);
      `,
        [email, password]
      );

      if (results.length < 1)
        throw res.status(401).json({
          message: "이메일 또는 비밀번호가 일치하지않습니다.",
        });

      res.status(200).json({
        status: "success",
        user_no: results[0].user_no,
      });
    } catch (err) {
      console.error(err);
    }
  },
  async repetitionCheck(req, res, next) {
    try {
      const email = req.query.email;

      const [results] = await res.pool.query(
        `
          SELECT
          COUNT(*) AS 'count'
          FROM users
          WHERE enabled = 1
          AND email = ?;
        `,
        [email]
      );

      if (results[0].count > 0)
        throw res.status(401).json({
          message: "이미 가입된 이메일 입니다.",
        });

      res.status(200).json({
        status: "success",
        message: "사용 가능합니다.",
      });
    } catch (err) {
      console.error(err);
    }
  },
  async register(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const name = req.body.name;

    const connection = await res.pool.getConnection();
    try {
      await connection.beginTransaction();
      await connection.query(
        `
          INSERT INTO users(email, password, phone, name)
          VALUE (?, PASSWORD(?), ?, ?);
        `,
        [email, password, phone, name]
      );
      await connection.commit();

      res.status(200).json({
        message: "영업자 계정을 추가하였습니다.",
      });
    } catch (err) {
      await connection.rollback(); // 롤백
      console.error(err);
    } finally {
      connection.release();
    }
  },
  async queryList(req, res, next) {
    try {
      const cat_1 = req.body.cat_1;
      const cat_2 = req.body.cat_2;
      const cat_3 = req.body.cat_3;
      const addr_1 = req.body.addr_1;
      const addr_2 = req.body.addr_2;
      const addr_3 = req.body.addr_3;

      const [results] = await res.pool.query(
        `
          SELECT store FROM Business_data
          WHERE cat_1 = ? AND cat_2 = ? AND cat_3 = ? AND addr_1 = ? AND addr_2 = ? AND addr_3 = ?;
        `,
        [cat_1, cat_2, cat_3, addr_1, addr_2, addr_3],
        function (e, results, fields) {
          if (e) {
            throw e;
          }
        }
      );

      res.status(200);
    } catch (e) {
      res.status(500).json({
        message: "다시 시도해주십시오.",
      });
      console.log(e);
    }
  },
  async myShop(req, res, next) {
    try {
      res.status(200).json({
        message: "",
      });
      res.json({
        status: "success",
      });
    } catch (e) {
      res.status(500).json({
        message: "다시 시도해주십시오.",
      });
      console.log(e);
    }
  },
  async collectStore(req, res, next) {
    try {
      const user_no = req.body.user_no;
      const store_no = req.body.store_no;

      const conn = await res.pool.getConnection();
      await conn.beginTransation();
      await conn.query(
        `
          INSERT INTO user_myshop (user_no, store_no)
          VALUES (?,?)
        `,
        [user_no, store_no],
        function (e, results, fields) {
          if (e) {
            throw e;
          }
        }
      );
      await conn.commit();

      res.status(200).json({
        message: "수집 되었습니다.",
      });
    } catch (e) {
      await conn.rollback(); // 롤백
      res.status(500).json({
        message: "다시 시도해주십시오.",
      });
      console.log(e);
    } finally {
      conn.release();
    }
  },
  async businessProgress(req, res, next) {
    try {
      const bus_prog = req.body.bus_prog;
      const user_no = req.body.user_no;
      const store_no = req.body.store_no;

      const conn = await res.pool.getConnection();
      await conn.beginTransation();
      await conn.query(
        `
          UPDATE user_myshop
          SET business_progress = ?
          WHERE user_no = ? AND store_no = ?
        `,
        [bus_prog, user_no, store_no],
        function (e, results, fields) {
          if (e) {
            throw e;
          }
        }
      );
      await conn.commit();

      res.status(200).json({
        message: "수집 되었습니다.",
      });
    } catch (e) {
      await conn.rollback(); // 롤백
      res.status(500).json({
        message: "다시 시도해주십시오.",
      });
      console.log(e);
    } finally {
      conn.release();
    }
  },
  async deleteCollection(req, res, next) {
    try {
      const user_no = req.body.user_no;
      const store_no = req.body.store_no;

      const conn = await res.pool.getConnection();
      await conn.beginTransation();
      await conn.query(
        `
          DELETE FROM user_myshop
          WHERE user_no = ? AND store_no = ?;
        `,
        [user_no, store_no],
        function (e, results, fields) {
          if (e) {
            throw e;
          }
        }
      );
      await conn.commit();

      res.status(200).json({
        message: "삭제 되었습니다.",
      });
    } catch (e) {
      await conn.rollback(); // 롤백
      res.status(500).json({
        message: "다시 시도해주십시오.",
      });
      console.log(e);
    } finally {
      conn.release();
    }
  },
  async toExcel(req, res, next) {
    try {
      res.status(200).json({
        message: "",
      });
    } catch (e) {
      res.status(500).json({
        message: "다시 시도해주십시오.",
      });
      console.log(e);
    }
  } /*
  async (req, res, next) {
    try {
      res.status(200).json({
        message: ""
      });
      res.json({
        status: "success",
      });
    } catch (e) {
      //   에러 핸들링
    }
  },*/,
};

module.exports = controller;
