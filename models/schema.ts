import { Schema, model } from 'mongoose';

const toDoItemSchema = new Schema({
  checkbox: {     
    type: Boolean,
    default: false
  },
  body: { 
    type: String,
    required: true,
    trim: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  tags: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

export default model('ToDoItem', toDoItemSchema);