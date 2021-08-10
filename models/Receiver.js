const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const receiverSchema = Schema(
  {
    bankAccount: { type: Number, require: true },
    phoneNumber: { type: Number, require: true },
    name: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
    location: { type: String, require: true },
    media: { type: String, require: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

receiverSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return accessToken;
};

const Receiver = mongoose.model("Receiver", receiverSchema);
module.exports = Receiver;
