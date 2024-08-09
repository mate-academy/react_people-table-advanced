import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeTodo } from '../../features/currentTodo';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [pressedTodoUser, setPressedTodoUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const pressedTodo = useAppSelector(state => state.currTodo.currentTodo);

  useEffect(() => {
    if (pressedTodo !== null) {
      getUser(pressedTodo.userId)
        .then(setPressedTodoUser)
        // eslint-disable-next-line no-console
        .catch(console.error)
        .finally(() => setIsLoadingUser(false));
    }

    return () => {
      setIsLoadingUser(true);
    };
  }, [pressedTodo?.id]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoadingUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{pressedTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {pressedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  pressedTodo?.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {pressedTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}
              <a href={`mailto:${pressedTodoUser?.email}`}>
                {pressedTodoUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
