const mongoose = require("mongoose");
const validator = require("validator");

const Backlog = require("./backlog.js");
const Sprint = require("./sprint.js");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    dateEnded: {
      type: Date,
    },

    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],

    backlog: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Backlog",
    },
  },
  {
    timestamps: true,
  }
);
//timestamps true will give us createdAt and updatedAt variables

//deletes backlog and sprints of a project before deleting a project
projectSchema.pre("remove", async function (next) {
  await Backlog.deleteMany({
    project: this._id,
  });
  await Sprint.deleteMany({
    project: this._id,
  });
  next();
});

projectSchema.virtual("tasks", {});

projectSchema.virtual("sprints", {
  ref: "Sprint",
  localField: "_id",
  foreignField: "project",
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
