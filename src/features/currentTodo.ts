import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface CurrentTodoState {
  currentTodo: Todo | null;
}

const initialState: CurrentTodoState = {
  currentTodo: null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    addCurrTodo: (state: CurrentTodoState, action: PayloadAction<Todo>) => {
      // eslint-disable-next-line no-param-reassign
      state.currentTodo = action.payload;
    },
    removeTodo: (state: CurrentTodoState) => {
      // eslint-disable-next-line no-param-reassign
      state.currentTodo = null;
    },
  },
});

export const { addCurrTodo, removeTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
