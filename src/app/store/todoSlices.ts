// src/app/store/todoSlices.ts
"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface Todo {
  id: number;
  name: string;
}

interface TodoState {
  todos: Todo[];
}

// Define the initial state using that type
const initialState: TodoState = {
  todos: [],
};

export const todoSlices = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },

    getTodos: (state) => {
      return state;
    },

    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    editTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
  },
});

export const { addTodo, deleteTodo, editTodo } = todoSlices.actions;

export default todoSlices.reducer;
