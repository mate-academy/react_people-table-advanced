import { AllOptions } from '../types/AllOptions';
import { Todo } from '../types/Todo';

export function handleFilteringTodos(
  todosList: Todo[],
  inputValue: string,
  selectOption: AllOptions,
): Todo[] {
  let filteredTodos = [...todosList];

  if (selectOption) {
    switch (selectOption) {
      case AllOptions.Active:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;

      case AllOptions.Completed:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;

      case AllOptions.All:
      default:
        break;
    }
  }

  if (inputValue.trim()) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }

  return filteredTodos;
}
