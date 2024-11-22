/* eslint-disable max-len */
import React from 'react';
import { ErrorMessages } from './PeoplePage';

interface ErrorComponentProps {
  message: ErrorMessages;
}

export function ErrorComponent({ message }: ErrorComponentProps) {
  return (
    <>
      {message === ErrorMessages.SOMETHING_WENT_WRONG && (
        <p data-cy="peopleLoadingError">{ErrorMessages.SOMETHING_WENT_WRONG}</p>
      )}
      {message === ErrorMessages.NO_PEOPLE && (
        <p data-cy="noPeopleMessage">{ErrorMessages.NO_PEOPLE}</p>
      )}
      {message === ErrorMessages.NO_PEOPLE_MATCHING_CRITERIA && (
        <p data-cy="noPeopleMessage">
          {ErrorMessages.NO_PEOPLE_MATCHING_CRITERIA}
        </p>
      )}
    </>
  );
}
