import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  addParent,
  getFilteredPeople,
  getPeople,
  getSortedPeople,
} from '../../api';

import { FilterType, Person } from '../../types';
import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { SortParam } from '../../types/SortParam';
import { DESC_SORT } from '../../utils/variables';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();
  const sort: typeof SortParam | string = searchParams.get('sort') || '';
  const sortedPeople = getSortedPeople(people, sort);

  const order = searchParams.get('order') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const filters: FilterType = {
    query,
    centuries,
    sex,
  };

  const filteredPeople = getFilteredPeople(filters, sortedPeople);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (order === DESC_SORT) {
    filteredPeople.reverse();
  }

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        setPeople(addParent(peopleFromServer));
      })
      .catch(() => {
        setHasError(true);
        setPeople([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const hasPeopleFilter = !isLoading && !!people.length;
  const hasErrorMessage = hasError && !isLoading;
  const hasNoPeopleOnServer = !people.length && !hasError && !isLoading;
  const hasNoMatchingPeople = !isLoading
  && !filteredPeople.length
  && !hasNoPeopleOnServer;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {hasPeopleFilter && (<PeopleFilters />)}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (<Loader />)}

              {hasErrorMessage && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {hasNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasNoMatchingPeople && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {!!people.length && (
                <PeopleTable
                  filteredPeople={filteredPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
