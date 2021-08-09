const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donationsSchema = Schema(
  {
    DonationRequest: { type: String, require: true },
    amount: { type: Number, require: true },
    userID: { type: String, require: false },
    receipt_image_url: { type: String, require: false },
    confirmed_by_receiver: { type: Boolean, require: true },
    email: { type: String, require: false },
    message: { type: String, require: false },
    isSending: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Donations = mongoose.model("Donations", donationsSchema);
module.exports = Donations;
