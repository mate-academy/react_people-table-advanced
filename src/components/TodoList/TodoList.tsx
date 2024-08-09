/* eslint-disable */
import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCurrTodo } from '../../features/currentTodo';


interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {

  const dispatch = useAppDispatch();
  const pressedTodo = useAppSelector(state => state.currTodo);

  return (
    <>
      {todos.length === 0 ? (<p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>) :

      (<table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
        {todos.map(todo => {
          const isSelectedTodo = pressedTodo.currentTodo?.id === todo.id;
          return (
            <tr
              key={todo.id}
              data-cy="todo"
              className={cn({
                'has-background-info-light': isSelectedTodo,
              })}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  } >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => dispatch(addCurrTodo(todo))}
                >
                  <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye-slash': isSelectedTodo,
                        'fa-eye': !isSelectedTodo,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}

        </tbody>
      </table>)}
    </>
  );
};
