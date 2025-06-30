/* eslint-disable max-len */
import { FC } from 'react';
import { usePeople } from '../../hooks/usePeople';
import { useFilteredAndSortedPeople } from '../../hooks/useFilteredAndSortedPeople';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: FC = () => {
  const { people, isLoading, errorMessage } = usePeople();

  const { visiblePeople } = useFilteredAndSortedPeople(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : errorMessage ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : visiblePeople.length > 0 ? (
                <PeopleTable people={visiblePeople} />
              ) : (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
