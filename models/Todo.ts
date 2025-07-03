
import mongoose, { Schema, models, Model } from 'mongoose';
import { Document } from 'mongoose';

export interface ITodo extends Document {
    checkbox: boolean;
    body: string;
    priority?: string;
  }

const TodoSchema = new Schema(
  {
    checkbox: {
      type: Boolean,
      default: false,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    }
  },
  {
    timestamps: true,
  }
);

const Todo: Model<ITodo> = models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);
export default Todo;