const express = require("express");
const receiverController = require("../controllers/receiver.controller");
const router = express.Router();

/**
 * @route POST api/receiver/request
 * @description Receiver see all receiver
 * @access LogIn required
 */
router.post("/request", receiverController.getAllReceiver);

/**
 * @route GET api/receiver/:id
 * @description User can search for a specific receiver
 * @access Public
 */
router.post("/receiver/:id", receiverController.getSingleReceiver);

/**
 * @route PUT api/receiver/request/edit/:id
 * @description Receiver can edit the donation request
 * @access LogIn required
 */
router.put("/request/edit/:id", receiverController.updateReceiver);

module.exports = router;
