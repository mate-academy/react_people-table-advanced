import React from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './arrayList/list';
import { Person } from '../../types';
import { PeopleFilters } from './PeopleFilters';
import '../../App.scss';

interface Props {
  people: Person[];
  loading: boolean;
  errorMessage: boolean;
}

export const PeoplePage: React.FC<Props> = ({
  people,
  loading,
  errorMessage,
}) => {
  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block displayf">
        <div className="box table-container">
          {loading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !errorMessage && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !errorMessage && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>

        <PeopleFilters />
      </div>
    </>
  );
};
