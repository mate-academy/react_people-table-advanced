import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodos => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

type TodosAction = SetTodos;

const todosReducer = (
  todos: Todo[] = [],
  action: TodosAction,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
