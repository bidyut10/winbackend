const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    totalFee: {
      type: Number,
      required: true,
      default: 100,
    },
    dateTime: {
      type: Date,
      default: Date.now,
    },
    address:{
      type: String,
      required: true,
      trim: true
    },
    orderStatus: {
      type: String,
      default: "completed",
      enum: ["completed", "canceled"],
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refs: "Service",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
