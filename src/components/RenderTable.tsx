import React from 'react';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { ErrorType } from '../utils/helpers';
import { Loader } from './Loader';

type Props = {
  people: Person[] | null;
  isLoading: boolean;
  errorType: ErrorType | null;
};

export const RenderTable: React.FC<Props> = ({
  people,
  errorType,
  isLoading,
}) => {
  if (isLoading) {
    return <Loader />;
  }

  if (errorType === ErrorType.SEARCH) {
    return <p>{errorType}</p>;
  }

  return (
    <PeopleTable
      people={people}
    />
  );
};
