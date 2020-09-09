const express = require("express");
const Story = require("../models/story.js");
const auth = require("../middleware/auth.js");

const router = new express.Router();

//create new story
router.post("/story", auth, async (req, res) => {
  const story = new Story({
    name: req.body.name,
    description: req.body.description,
    backlog: req.body.backlog,
  });

  try {
    await story.save();

    res.status(201).send(story);
  } catch (e) {
    res.status(400).send({ Error: e.message });
  }
});

router.delete("/story/:id", auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    story.remove();
    res.status(201).send("Succesfully deleted");
  } catch (e) {
    res.status(400).send({ Error: e.message });
  }
});

module.exports = router;
