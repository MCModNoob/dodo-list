
import mongoose, { Schema, models, Model } from 'mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export interface ITodo extends Document {
    _id: Types.ObjectId;
    checkbox: boolean;
    body: string;
  }

const TodoSchema = new Schema(
  {
    checkbox: {
      type: Boolean,
      default: false,
    },
    body: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo: Model<ITodo> = models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);
export default Todo;