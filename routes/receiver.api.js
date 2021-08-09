const express = require("express");
const receiverController = require("../controllers/receiver.controller");
const router = express.Router();

/**
 * @route POST api/receiver/request
 * @description Receiver can make a donation request
 * @access LogIn required
 */
router.post("/request", receiverController.request);

/**
 * @route GET api/receiver/:id
 * @description User can search for a specific receiver
 * @access Public
 */
router.post("/receiver/:id");

/**
 * @route PUT api/receiver/request/edit/:id
 * @description Receiver can edit the donation request
 * @access LogIn required
 */
router.put("/request/edit/:id", receiverController.edit);

module.exports = router;