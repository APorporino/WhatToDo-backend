const express = require("express");
const auth = require("../middleware/auth.js");
const Backlog = require("../models/backlog");

const router = new express.Router();

// provide: id of backlog
router.get(
  "/backlog/:id/stories/:taskLmit/:taskSkip/:storyLimit/:storySkip",
  auth,
  async (req, res) => {
    const backlog = await Backlog.findById(req.params.id);
    const stories = await backlog.getAllStories(
      req.params.taskLmit,
      req.params.taskLmit,
      req.params.storyLimit,
      req.params.storySkip
    );

    res.send(stories);
  }
);

module.exports = router;
