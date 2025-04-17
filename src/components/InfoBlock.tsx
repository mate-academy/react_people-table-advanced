import React from 'react';
import { Loader } from './Loader';

type Props = {
  isLoading: boolean;
  hasError: boolean;
  isEmpty: boolean;
  isFilteredOut: boolean;
};

export const InfoBlock: React.FC<Props> = ({
  isLoading,
  hasError,
  isEmpty,
  isFilteredOut,
}) => {
  switch (true) {
    case isLoading:
      return <Loader />;
    case hasError:
      return (
        <>
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
          <img src="https://http.cat/599" alt="connection error" />
        </>
      );
    case isEmpty:
      return (
        <>
          <p data-cy="noPeopleMessage">There are no people on the server</p>
          <img src="https://http.cat/204" alt="empty" />
        </>
      );
    case isFilteredOut:
      return (
        <>
          <p>There are no people matching the current search criteria</p>
          <img src="https://http.cat/204" alt="empty" />
        </>
      );
    default:
      return '';
  }
};
