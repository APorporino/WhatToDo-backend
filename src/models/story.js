const mongoose = require("mongoose");
const validator = require("validator");

const Task = require("./task.js");

const storySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate(name) {
        if (name.length > 50) {
          throw new Error("Must be less than 50 characters");
        }
      },
    },

    description: {
      type: String,
      required: true,
      validate(description) {
        if (description.length > 200) {
          throw new Error("Must be less than 200 characters");
        }
      },
    },

    backlog: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Backlog",
    },

    sprint: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Sprint",
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//virtual list of tasks
storySchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "story",
  justOne: false,
});

storySchema.pre("remove", async function (next) {
  await Task.deleteMany({
    story: this._id,
  });
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
