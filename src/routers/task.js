const express = require("express");
const Task = require("../models/task.js");
const auth = require("../middleware/auth.js");

const router = new express.Router();

/**
 * requires story id, and description
 *
 * create a new task
 *
 */
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(error);
  }
});

//GET tasks /tasks
//possible query params; completed, limit, skip, sortBy
//ex: /tasks?completed=true&limit=10&skip=1&sortBy=createdAt_desc
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split("_");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    //const tasks = await Task.find({owner: req.user._id})
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          //will be ignored if not provided
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  //note :variable is how to pass request parameters

  try {
    console.log(req.params.id);
    console.log(req.user._id);
    const task = await Task.findOne({ _id: req.params.id });

    if (task) {
      return res.send(task);
    }
    res.status(404).send();
  } catch (e) {
    res.status(400).send();
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    const updateFields = Object.keys(req.body);
    updateFields.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();

    //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

    res.send(task);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (task) {
      return res.send(task);
    }
    res.status(404).send();
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
