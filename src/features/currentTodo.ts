import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

export const actions = { setTodo, removeTodo };

type CurrentTodoState = Todo | null;
type CurrentTodoAction = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state: CurrentTodoState = null,
  action: CurrentTodoAction,
): CurrentTodoState => {
  switch (action.type) {
    case 'currentTodo/SET':
      return action.payload;

    case 'currentTodo/REMOVE':
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
