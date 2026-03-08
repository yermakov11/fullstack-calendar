const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true},
  date: { type: Date, required: true},
  color: { type: String, required: true, default: "#238783"},
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now},
});

module.exports = mongoose.model("Event", EventSchema);

