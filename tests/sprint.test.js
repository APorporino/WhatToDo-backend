const supertest = require("supertest");
const app = require("../src/app.js");
const Sprint = require("../src/models/sprint.js");
const { project, user1, setUpDatabase } = require("./fixures/db.js");

beforeEach(setUpDatabase);

test("Make a sprint", async () => {
  const response = await supertest(app)
    .post("/sprint")
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .send({
      project: project._id,
    })
    .expect(201);

  const sprint = await Sprint.findById(response.body._id);
  expect(sprint).not.toBe(null);
});
