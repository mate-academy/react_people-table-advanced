import React from 'react';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { ErrorType } from '../types/ErrorType';
import { Loader } from './Loader';

type Props = {
  slug: string;
  people: Person[] | null;
  isFetching: boolean;
  errorType: ErrorType | null;
  searchParams: URLSearchParams;
};

export const RenderTable: React.FC<Props> = ({
  slug,
  people,
  errorType,
  isFetching,
  searchParams,
}) => {
  if (isFetching) {
    return <Loader />;
  }

  if (errorType === ErrorType.SEARCH) {
    return <p>{errorType}</p>;
  }

  return (
    <PeopleTable
      slug={slug}
      people={people}
      searchParams={searchParams}
    />
  );
};
