const utilsHelper = require("../helpers/utils.helper");
const Receiver = require("../models/Receiver");
const receiverController = {};

receiverController.getAllReceiver = async (req, res, next) => {
  try {
    const page = req.params.page;
    const limit = req.params.limit;
    let receiver = Receiver;
    const response = utilsHelper.sendResponse(
      res,
      200,
      true,
      { receiver },
      null,
      "Get all receiver successfully."
    );

    if (page && limit) {
      let receiver = Receiver.splice((page - 1) * limit, page * limit + 1);
      return response;
    } else {
      let receiver = Receiver.splice(0, 10);
      return response;
    }
  } catch (error) {
    next(error);
  }
};

receiverController.getSingleReceiver = async (req, res, next) => {
  try {
    const { id } = req.body;
    let receiver = await Receiver.findOne({ id });
    if (!receiver) return next(new Error("401 - Receiver does not exist."));

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { receiver },
      null,
      "Get single receiver successfully."
    );
  } catch (error) {
    next(error);
  }
};

receiverController.updateReceiver = async (req, res, next) => {
  try {
    let receiverId = req.params.id;
    let { status } = req.body;
    let receiver = await Receiver.findByIdAndUpdate(receiverId, { status });
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { receiver },
      null,
      "Updated successfully."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = receiverController;
