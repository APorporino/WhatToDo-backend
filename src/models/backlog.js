const mongoose = require("mongoose");
const validator = require("validator");
const Story = require("./story");

const backlogSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

//virtual list of stories
backlogSchema.virtual("stories", {
  ref: "Story",
  localField: "_id",
  foreignField: "backlog",
  justOne: false,
});

//deletes stories of backlog before deleting backlog
backlogSchema.pre("remove", async function (next) {
  await Story.deleteMany({
    backlog: this._id,
  });
  next();
});

backlogSchema.methods.getAllTasks = async function () {
  var tasks = [];
  const stories = await mongoose.model("Story").find({ backlog: this.id });

  for (const story of stories) {
    await story
      .populate({
        path: "tasks",
      })
      .execPopulate();
    story.tasks.forEach((task) => {
      tasks.push(task);
    });
  }
  return tasks;
};

// this method will get all stories in this backlog with the tasks attached. It is better than getAllTasks function
backlogSchema.methods.getAllStories = async function (
  taskLimit,
  taskSkip,
  storyLimit,
  storySkip
) {
  const stories = await mongoose
    .model("Story")
    .find({ backlog: this.id }, null, {
      limit: parseInt(storyLimit),
      skip: parseInt(storySkip),
    });
  const storiesWithTasks = await mongoose
    .model("Story")
    .find({ backlog: this.id }, null, {
      limit: parseInt(storyLimit),
      skip: parseInt(storySkip),
    })
    .lean(); // lean makes into a JS object not a mongoose document

  let i = 0;
  for (const story of stories) {
    await story
      .populate({
        path: "tasks",
        options: {
          //will be ignored if not provided
          limit: parseInt(taskLimit),
          skip: parseInt(taskSkip),
        },
      })
      .execPopulate();
    storiesWithTasks[i]["tasks"] = story.tasks;
    i++;
  }

  return storiesWithTasks;
};

const Backlog = mongoose.model("Backlog", backlogSchema);

module.exports = Backlog;
