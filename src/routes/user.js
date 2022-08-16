const { getUserList } = require("../controller/user");
const { Router } = require("express");
const router = Router();
router.get("/getUserList", getUserList);
module.exports = router;
