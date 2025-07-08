import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Todo, { ITodo } from '@/models/Todo';

// GET /api/todos - Fetch all todos
export async function GET() {
    try {
      await connectToDatabase();
      const todos = await Todo.find({});
      return NextResponse.json(todos, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
    }
  }

  // POST /api/todos - Create a new todo
 export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const { checkbox, body, priority } = await request.json();
    const newTodo = await Todo.create({ checkbox, body, priority });
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
  }
}