import React from 'react';

export const ErrorNotification: React.FC = () => {
  return (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      Something went wrong
    </p>
  );
};
