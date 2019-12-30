const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  timezone: {
    type: String,
    required: true,
  },
  availability_constraints: [{
    day : {
      type: String,
      required: true,
    },
    start : {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Resource", ResourceSchema);