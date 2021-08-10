const { request } = require("../app");
const utilsHelper = require("../helpers/utils.helper");
const Requests = require("../models/request");
const requestController = {};

requestController.getAllRequests = async (req, res, next) => {
  try {
    const page = req.params.page;
    const limit = req.params.limit;
    let requests = Requests;
    const response = utilsHelper.sendResponse(
      res,
      200,
      true,
      { requests },
      null,
      "Get all requests successfully."
    );

    if (page && limit) {
      let requests = Requests.splice((page - 1) * limit, page * limit + 1);
      return response;
    } else {
      let requests = Requests.splice(0, 10);
      return response;
    }
  } catch (error) {
    next(error);
  }
};

requestController.getSingleRequest = async (req, res, next) => {
  try {
    const { id } = req.body;
    let request = await Requests.findOne({ id });
    if (!request) return next(new Error("401 - Request does not exist."));

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { request },
      null,
      "Get single request successfully."
    );
  } catch (error) {
    next(error);
  }
};

requestController.createRequest = async (req, res, next) => {
  try {
    let { receiverId, need, requestFor, location, details, media } = req.body;

    let request = await Requests.create({
      receiverId,
      need,
      requestFor,
      location,
      details,
      media,
    });
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { request },
      null,
      "Created new donation request successfully."
    );
  } catch (error) {
    next(error);
  }
};

requestController.updateRequest = async (req, res, next) => {
  try {
    let requestId = req.params.id;
    let { isWaiting } = req.body;
    let request = await Requests.findByIdAndUpdate(requestId, { isWaiting });
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { request },
      null,
      "Updated successfully."
    );
  } catch (error) {
    next(error);
  }
};

requestController.deleteRequest = async (req, res, next) => {
  try {
    let requestId = req.params.id;
    let request = await Requests.findIdDelete(requestId);
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { request }, //not sure
      null,
      "Deleted successfully."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = requestController;
