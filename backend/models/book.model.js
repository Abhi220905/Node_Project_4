const mongoose = require("mongoose");
const { commonString } = require("../utils/common");

const bookSchema = new mongoose.Schema(
  {
    title: commonString,
    author: commonString,
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);