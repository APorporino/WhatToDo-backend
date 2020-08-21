const mongoose = require("mongoose");
const validator = require("validator");

const taskSchema = new mongoose.Schema(
  {
    asignedTo: {
      type: mongoose.Schema.Types.ObjectId,
    },

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

    completed: {
      type: Boolean,
      default: false,
    },

    story: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Story",
    },

    sprint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sprint",
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
