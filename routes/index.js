var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ status: "ok", data: "Hello World!" });
});

/* auth endpoint */
const authApi = require("./auth.api");
router.use("/auth", authApi);

/* receiver endpoint */
const receiverApi = require("./receiver.api");
router.use("/receiver", receiverApi);

module.exports = router;
