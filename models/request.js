const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const requestSchema = Schema(
    {
        receiverId: {type: String, require: true},
        need: {type: Number, require: true},
        amount_remaining: {type: Number, default: 1 },
        requestFor: {type: String, require: true},
        location: {type: String, require: true},
        details: {type: String, require: true},
        media: {type: String, require: true},
        isWaiting: {type: Boolean, default: true},
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Requests = mongoose.model("Requests", requestSchema);
module.exports = Requests;