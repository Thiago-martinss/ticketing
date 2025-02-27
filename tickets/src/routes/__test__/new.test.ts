import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.statusCode).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns a status other tan 401 if the user is signed in", async () => {
 const response =  await request(app).post("/api/tickets").send({}).expect(401);
  expect(response.statusCode).not.toEqual(401);
});

it("returns an error is an invalid title is provided", async () => {
  const response = await request(app).post("/api/tickets").send({});
});

it("returns an error is an invalid price is provided", async () => {
  const response = await request(app).post("/api/tickets").send({});
});

it("creates a ticket with valid inputs", async () => {
  const response = await request(app).post("/api/tickets").send({});
});
