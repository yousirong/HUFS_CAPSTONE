const express = require("express");
const router = express.Router();

const common = require("../controllers/common");

router.get("/ping", common.ping);
router.post("/login", common.login); //로그인
router.get("/check", common.repetitionCheck); //아이디 중복검사
router.post("/register", common.register); //회원가입
router.post("/query", common.queryList); //매장목록 쿼리
router.post("/myshop", common.myShop); //My shop
router.post("/collect", common.collectStore); //매장 수십
router.post("/myshop/prog", common.businessProgress); //진행상황 업데이트
router.post("/myshop/delete", common.deleteCollection); //수집된 매장 삭제
router.post("/myshop/delete", common.deleteCollection);
/*
router.("/", common.);
*/
module.exports = router;
