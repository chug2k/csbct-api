const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ status: "ok", data: "Hello World!" });
});

// /* auth endpoint */
// const authApi = require("./auth.api");
// router.use("/auth", authApi);

// /* receiver endpoint */
// const receiverApi = require("./receiver.api");
// router.use("/receiver", receiverApi);


/* Donation request endpoint */
const donationRequestApi = require("./request.api");
router.use("/donation_requests", donationRequestApi);

module.exports = router;
