const express = require("express");
const receiverController = require("../controllers/receiver.controller");
const router = express.Router();

/**
 * @route GET api/receiver
 * @description GET all receiver
 * @access LogIn required
 */
router.get("/receiver", receiverController.getAllReceiver);

/**
 * @route GET api/receiver/:id
 * @description User can search for a specific receiver
 * @access Public
 */
router.get("/receiver/:id", receiverController.getSingleReceiver);

/**
 * @route PUT api/receiver/request/edit/:id
 * @description Receiver can edit his profile
 * @access LogIn required
 */
router.put("/request/edit/:id", receiverController.updateReceiver);

module.exports = router;
