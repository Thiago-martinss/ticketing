import request from "supertest";
import { app } from "../../app";

it(" returns a 404 if the provided id does not exist", async () => {
  await request(app)
    .put(`/api/tickets/${Math.random()}`)
    .set("Cookie", await global.signin())
    .send({ title: "Updated title", price: 10 })
    .expect(404);
});

it(" returns a 401 if the user is not authenticated", async () => {
  await request(app)
    .put(`/api/tickets/${Math.random()}`)
    .send({ title: "Updated title", price: 10 })
    .expect(401);
});

it(" returns a 401 if the provided user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", await global.signin())
    .send({ title: "New ticket", price: 20 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", await global.signin())
    .send({ title: "Updated title", price: 10 })
    .expect(401);
});

it(" returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .put(`/api/tickets/`)
    .set("Cookie", await cookie)
    .send({ title: "test", price: 10 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", await cookie)
    .send({ title: "", price: 30 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", await cookie)
    .send({ title: "test title", price: -10 })
    .expect(400);
});

it("it updates the ticket provided valid inputs ", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", await cookie)
    .send({ title: "New ticket", price: 20 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", await cookie)
    .send({ title: "Updated title", price: 30 })
    .expect(200);

  const updatedTicket = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(updatedTicket.body.title).toEqual("Updated title");
  expect(updatedTicket.body.price).toEqual(30);
});
