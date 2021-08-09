const { donations } = require("../app");
const utilsHelper = require("../helpers/utils.helper");
const Donations = require("../models/donations");
const donationsController = {};

donationsController.getAllDonations = async (req, res, next) => {
  try {
    const page = req.params.page;
    const limit = req.params.limit;
    let donations = Donations;
    const response = utilsHelper.sendResponse(
      res,
      200,
      true,
      { donations },
      null,
      "Get all donations successfully."
    );

    if (page && limit) {
      let donations = Donations.splice((page - 1) * limit, page * limit + 1);
      return response;
    } else {
      let donations = Donations.splice(0, 10);
      return response;
    }
  } catch (error) {
    next(error);
  }
};

donationsController.getSingleDonations = async (req, res, next) => {
  try {
    const { id } = req.body;
    let donations = await Donations.findOne({ id });
    if (!donations) return next(new Error("401 - Donation does not exist."));

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { donations },
      null,
      "Get single donation successfully."
    );
  } catch (error) {
    next(error);
  }
};

donationsController.createDonations = async (req, res, next) => {
  try {
    let {
      DonationRequest,
      amount,
      userID,
      receipt_image_url,
      confirmed_by_receiver,
    } = req.body;

    let donations = await Donations.create({
      DonationRequest,
      amount,
      userID,
      receipt_image_url,
      confirmed_by_receiver,
      email,
      message,
    });
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { donations },
      null,
      "Created new donation successfully."
    );
  } catch (error) {
    next(error);
  }
};

donationsController.updateDonation = async (req, res, next) => {
  try {
    let donationID = req.params.id;
    let { isSending } = req.body;
    let donations = await Donations.findByIdAndUpdate(donationID, {
      isSending,
    });
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { donations },
      null,
      "Updated successfully."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = donationsController;
