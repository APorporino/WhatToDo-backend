const mongoose = require("mongoose");
const validator = require("validator");

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Not started",
    },

    tag: {
      type: String,
      default: "dev",
    },

    story: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Story",
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.pre("save", async function (next) {
  next();
});
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
