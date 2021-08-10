const express = require("express");
const donationsController = require("../controllers/donations.controller");
const router = express.Router();

/**
 * @route POST api/giver/donations
 * @description giver can make a create a donation
 * @access LogIn required
 */
router.post("/donations", donationsController.createDonations);

/**
 * @route GET api/giver/donations
 * @description giver can see all donations
 * @access LogIn required
 */
router.get("/donations", donationsController.getAllDonations);

/**
 * @route GET api/giver/:id
 * @description Giver can search for a specific donation
 * @access LogIn required
 */
router.get("/donations/:id", donationsController.getSingleDonations);

/**
 * @route PUT api/giver/donations/:id
 * @description giver can edit the donation
 * @access LogIn required
 */
router.put("/donations/edit/:id", donationsController.updateDonation);

module.exports = router;
