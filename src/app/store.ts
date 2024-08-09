import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos';
import currentTodoReducer from '../features/currentTodo';
import filtersReducer from '../features/filter';

// const rootReducer = combineSlices();

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    currTodo: currentTodoReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
