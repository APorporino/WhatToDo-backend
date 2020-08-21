const express = require("express");
const User = require("../models/user.js");
const Project = require("../models/project.js");
const Backlog = require("../models/backlog.js");
const auth = require("../middleware/auth.js");

const router = new express.Router();

//This will create a project and assign the authenticated user as the first admin
//It will generate an empty backlog
router.post("/project", auth, async (req, res) => {
  const admin = req.user._id;
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    members: [admin],
    admins: [admin],
  });
  const backlog = new Backlog({
    project: project._id,
  });
  project.backlog = backlog._id;
  try {
    await project.save();
    await backlog.save();
    res.status(201).send(project);
  } catch (e) {
    res.status(404).send({ Error: e.message });
  }
});

router.delete("/project", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.body.project_id);
    if (!project) {
      throw new Error("That project does not exist");
    }
    if (!project.admins.includes(req.user._id)) {
      throw new Error("You must be an admin to add someone to the project");
    }
    project.remove();
    res.status(200).send(project);
  } catch (e) {
    res.status(400).send({ Error: e.message });
  }
});

//This route will add a user to the project as a member. Only admins can do this
//must pass body with project_id of project and user_email of user to be added
router.patch("/project", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.body.project_id);
    const userToBeAdded = await User.findOne({
      email: req.body.user_email,
    });

    if (userToBeAdded.length === 0) {
      throw new Error("That user does not exist");
    }
    if (!project.admins.includes(req.user._id)) {
      throw new Error("You must be an admin to add someone to the project");
    }

    if (project.members.includes(userToBeAdded._id)) {
      throw new Error("This user is already a member of this project");
    }
    project.members.push(userToBeAdded._id);
    await project.save();
    res.status(200).send(project);
  } catch (e) {
    res.status(400).send({
      Error: e.message,
    });
  }
});

//this route will allow the admin of a project to make another user an admin
router.patch("/project/addAdmin", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.body.project_id);
    if (!project.admins.includes(req.user._id)) {
      throw new Error("You must be an admin to make someone else an admin");
    }
    project.admins.push(req.body.user_id);
    await project.save();
    res.status(200).send(project);
  } catch (e) {
    res.status(400).send({ Error: e.message });
  }
});

router.get("/projectTasks", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.body.project_id);
    const backlog = await Backlog.findById(project.backlog);
    const tasks = await backlog.getAllTasks();
    res.send(tasks);
  } catch (e) {
    res.status(400).send({ Error: e.message });
  }
});

router.get("/project/:id/members", auth, async (req, res) => {
  let members = [];
  try {
    const project = await Project.findById(req.params.id);
    for (id of project.members) {
      const user = await User.findById(id);
      members.push(user.email);
    }
    res.send(members);
  } catch (e) {
    res.status(400).send({ Error: e.message });
  }
});

router.get("/project/:id/admins", auth, async (req, res) => {
  let admins = [];
  try {
    const project = await Project.findById(req.params.id);
    for (id of project.admins) {
      const user = await User.findById(id);
      admins.push(user.email);
    }
    res.send(admins);
  } catch (e) {
    res.status(400).send({ Error: e.message });
  }
});

module.exports = router;
