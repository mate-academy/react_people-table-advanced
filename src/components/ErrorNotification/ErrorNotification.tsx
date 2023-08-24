import { useContext } from 'react';

import { PeopleContext } from '../../context';
import { ErrorType } from '../../types';

export const ErrorNotification = () => {
  const { errorMessage } = useContext(PeopleContext);

  return (
    <>
      {errorMessage === ErrorType.SERVER && (
        <p data-cy="peopleLoadingError">Something went wrong</p>
      )}

      {errorMessage === ErrorType.DATA && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
    </>
  );
};
