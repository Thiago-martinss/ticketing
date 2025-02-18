import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password123',
    })
    .expect(201);
});

it('returns a 400 with an error message if the email is invalid', () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test.test',
      password: 'password123',
    })
    .expect(400);
});

it('returns a 400 with an error message if the password is too short', () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'pas',
    })
    .expect(400);
});

it('returns a 400 with an missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({email: 'test@test.com'})
    .expect(400);

    await request(app)
    .post('/api/users/signup')
    .send({password: "password123"})
    .expect(400);
});

it('disallows duplicate email addresses', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password123',
    })
    .expect(201);

    await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'differentpassword',
    })
    .expect(400);
  });

  it('sets a cookie after successful login', async () => {
    const response = await request(app)
     .post('/api/users/signup')
     .send({
        email: 'test@test.com',
        password: 'password123',
      })
      .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();


    });