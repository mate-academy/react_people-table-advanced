import React from 'react';
import classNames from 'classnames';
import { ERRORS } from '../../utils';

type Props = {
  errorMessage: string;
};

export const ErrorNotification: React.FC<Props> = ({ errorMessage }) => (
  <p
    data-cy={errorMessage === ERRORS.DOWNLOAD_ERROR
      ? 'peopleLoadingError'
      : errorMessage === ERRORS.NO_PEOPLE_ERROR
        && 'noPeopleMessage'}
    className={classNames({
      'has-text-danger': errorMessage === ERRORS.DOWNLOAD_ERROR,
    })}
  >
    {errorMessage}
  </p>
);
