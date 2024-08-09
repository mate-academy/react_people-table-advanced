import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { add } from './features/todos';
import { handleFilteringTodos } from './utils/handleFilteringTodos';
import { AllOptions } from './types/AllOptions';

export const App = () => {
  const [isLoadingTodo, setIsLoadingTodo] = useState(true);
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const pressedTodo = useAppSelector(state => state.currTodo);
  const filters = useAppSelector(state => state.filters);

  const visibleTodos = handleFilteringTodos(
    todos,
    filters.query,
    filters.status as AllOptions,
  );

  useEffect(() => {
    getTodos()
      .then(todosFromServer => dispatch(add(todosFromServer)))
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => setIsLoadingTodo(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoadingTodo ? <Loader /> : <TodoList todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>

      {pressedTodo.currentTodo && <TodoModal />}
    </>
  );
};
