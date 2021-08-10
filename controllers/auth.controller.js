const utilsHelper = require("../helpers/utils.helper");
const bcrypt = require("bcrypt");
const Receiver = require("../models/Receiver");
const authController = {};

authController.register = async (req, res, next) => {
  try {
    let { bankAccount, phoneNumber, name, password, email, location, media } =
      req.body;
    console.log(
      name,
      email,
      password,
      bankAccount,
      phoneNumber,
      location,
      media
    );
    let receiver = await Receiver.findOne({ email });
    if (receiver) return next(new Error("401 - Email already exits"));
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    receiver = await Receiver.create({
      name,
      email,
      password,
      bankAccount,
      phoneNumber,
      location,
      media,
    });
    const accessToken = await receiver.generateToken();
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { receiver, accessToken },
      null,
      "Register successfully"
    );
  } catch (err) {
    next(err);
  }
};

authController.loginWithEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let receiver = await Receiver.findOne({ email });
    if (!receiver) return next(new Error("401 - Email not exists"));

    const isMatch = await bcrypt.compare(password, receiver.password);
    if (!isMatch) return next(new Error("401 - Wrong password"));

    const accessToken = await receiver.generateToken();
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { receiver, accessToken },
      null,
      "Login success"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = authController;
