import React from 'react';

type Props = {
  errorMessage: string;
};

export const ErrorMessage: React.FC<Props> = ({ errorMessage }) => (
  <p data-cy="peopleLoadingError" className="has-text-danger">
    {errorMessage}
  </p>
);
