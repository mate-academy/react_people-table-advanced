import React from 'react';

interface Props {
  errorMessage: string,
}

export const ErrorComponent: React.FC<Props> = ({ errorMessage }) => (
  <p data-cy="peopleLoadingError" className="has-text-danger">
    {errorMessage}
  </p>
);
