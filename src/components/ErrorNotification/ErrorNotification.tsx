import React from 'react';
import classNames from 'classnames';
import { Error } from '../../types/Error';

type Props = {
  error: Error;
};

export const ErrorNotification: React.FC<Props> = ({ error }) => {
  const errorType = (error === Error.GET_PEOPLE)
    ? 'peopleLoadingError'
    : 'noPeopleMessage';

  return (
    <p
      data-cy={errorType}
      className={classNames(
        { 'has-text-danger': errorType === 'peopleLoadingError' },
      )}
    >
      {error}
    </p>
  );
};
