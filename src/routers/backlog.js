const express = require("express");
const auth = require("../middleware/auth.js");
const Backlog = require("../models/backlog");

const router = new express.Router();

// provide: id of backlog and get all stories with tasks attached as response
router.get(
  "/backlog/:id/stories/:taskLimit/:taskSkip/:storyLimit/:storySkip",
  auth,
  async (req, res) => {
    try {
      const backlog = await Backlog.findById(req.params.id);
      const stories = await backlog.getAllStories(
        req.params.taskLimit,
        req.params.taskSkip,
        req.params.storyLimit,
        req.params.storySkip
      );

      res.send(stories);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
);

module.exports = router;
