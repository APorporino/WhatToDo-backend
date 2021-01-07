const express = require("express");
const Sprint = require("../models/sprint.js");
const Task = require("../models/task.js");
const auth = require("../middleware/auth.js");

const router = new express.Router();

router.post("/sprint", auth, async (req, res) => {
  const sprint = new Sprint({
    ...req.body,
  });

  try {
    await sprint.save();
    res.status(201).send(sprint);
  } catch (e) {
    res.status(404).send({ Error: e.message });
  }
});

router.delete("/sprint", auth, async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.body.sprintId);
    if (!sprint) {
      throw new Error("That sprint does not exist");
    }
    sprint.remove();
    res.status(200).send(sprint);
  } catch (e) {
    res.status(400).send({ Error: e.message });
  }
});

router.post("/sprint/addTask", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.body.taskId);
    if (!task) {
      throw new Error("Cannot find that task");
    }
    task.sprint = req.body.sprintId;
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(404).send({ Error: e.message });
  }
});

/**
 * Will get all stories associatied with this sprint
 */
router.get("/sprint/getAllStories/:id", auth, async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id);

    if (!sprint) {
      throw new Error("Cannot find that sprint");
    }

    await sprint.populate({ path: "stories" }).execPopulate();

    res.send(sprint.stories);
  } catch (e) {
    res.status(400).send("Error: " + e);
  }
});

/**
 * Will get all tasks associatied with this sprint
 */
router.get("/sprint/getAllTasks/:id", auth, async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id);
    if (!sprint) {
      throw new Error("Cannot find that sprint");
    }
    await sprint.populate({ path: "stories" }).execPopulate();
    const tasks = await sprint.getAllTasks(sprint.stories);
    res.send(tasks);
  } catch (e) {
    res.status(400).send("Error: " + e);
  }
});

module.exports = router;
