import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodosState = Todo[];

const initialState: TodosState = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add: (todos: TodosState, action: PayloadAction<Todo[]>) => {
      todos.push(...action.payload);
    },
  },
});

export const { add } = todosSlice.actions;
export default todosSlice.reducer;
