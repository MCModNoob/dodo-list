import { afterAll, beforeAll, describe, it, expect } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import Todo from '@/models/Todo';
import { connectToDatabase } from '@/lib/mongodb';

const app = require('next/dist/server/api-utils').default; // Not ideal — better to use a custom server or mock

describe('DELETE /api/todos test', () => {
  let testTodoId = '';

  beforeAll(async () => {
    await connectToDatabase();

    // Insert a test todo
    const created = await Todo.create({
      body: 'Test todo for deletion',
      checkbox: false,
      priority: 'Low',
    });

    testTodoId = created._id.toString();
  });

  afterAll(async () => {
    // Clean up
    await Todo.deleteMany({});
    await mongoose.disconnect();
  });

  it('should delete a todo by ID', async () => {
    const response = await request('http://localhost:3000')
      .delete('/api/todos')
      .send({id: testTodoId })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Todo deleted successfully');

    // Verify it's gone
    const deletedTodo = await Todo.findById(testTodoId);
    expect(deletedTodo).toBeNull();
  });

  it('should return 400 for invalid ID', async () => {
    const response = await request('http://localhost:3000')
      .delete('/api/todos')
      .send({ id: 'invalid-id' })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid ID');
  });

  it('should return 404 if todo not found', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();

    const response = await request('127.0.0.1:27017/appdb')
      .delete('/api/todos')
      .send({ id: fakeId })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Todo not found');
  });
});