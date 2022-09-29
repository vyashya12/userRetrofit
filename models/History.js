const mongoose = require("mongoose")
const Schema = mongoose.Schema

const HistorySchema = new Schema({
  name: { type: String },
  address: { type: String },
  timeStamp: { type: Date, default: Date.now },
  created_by: { type: String },
})

module.exports = mongoose.model("History", HistorySchema)
