const supertest = require("supertest");
const app = require("../src/app.js");
const Project = require("../src/models/project.js");
const { user1, setUpDatabase } = require("./fixures/db.js");

beforeEach(setUpDatabase);

test("Make a new project", async () => {
  const response = await supertest(app)
    .post("/project")
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .send({
      name: "New Project",
    })
    .expect(201);

  const project = await Project.findById(response.body._id);
  expect(project).not.toBeNull();
  expect(project.name).toBe("New Project");
});
