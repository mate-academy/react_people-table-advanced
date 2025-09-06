import React from 'react';
import { ErrorMassege } from '../types/ErrorMassege';

type Props = {
  error: ErrorMassege;
};

export const ErrorMessage: React.FC<Props> = ({ error }) => {
  return (
    <>
      {error === ErrorMassege.SomethingWentWrong && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      )}
      {error === ErrorMassege.NoPeople && (
        <p data-cy="noPeopleMessage">{error}</p>
      )}
    </>
  );
};
