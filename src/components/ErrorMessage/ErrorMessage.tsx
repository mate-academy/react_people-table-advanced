import React from 'react';
import { Error } from '../../types/Error';

type Props = {
  error: Error;
};

export const ErrorMessage: React.FC<Props> = ({ error }) => {
  return (
    <>
      {error === Error.NOMATCHES && (
        <p>
          There are no people matching the current search criteria
        </p>
      )}

      {error === Error.NOPEOPLE && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {error === Error.ONLOADING && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
    </>
  );
};
