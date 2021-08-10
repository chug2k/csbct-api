const express = require("express");
const donationsController = require("../controllers/donations.controller");
const router = express.Router();

/**
 * @route POST api/giver/donations
 * @description giver can make a create a donation
 * @access LogIn required
 */
router.post("/donations", donationsController.donations);

/**
 * @route GET api/giver/donations
 * @description giver can see all donations
 * @access LogIn required
 */
router.get("/donations", donationsController.donations);

/**
 * @route GET api/giver/:id
 * @description Giver can search for a specific donation
 * @access LogIn required
 */
router.get("/giver/:id");

/**
 * @route PUT api/giver/donations/:id
 * @description giver can edit the donation
 * @access LogIn required
 */
router.put("/donations/:id", donationsController.edit);

module.exports = router;
