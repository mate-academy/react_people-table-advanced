import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleFilters } from '../PeopleFilters';
import { PeopleTable } from '../PeopleTable';
import { getFilteredPeople } from '../../utils/filteredPeople';
import { getSortedPeople } from '../../utils/SortingPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoader(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoader(false));
  }, []);

  const filteredPeople = useMemo(() => {
    const filters = {
      sex: searchParams.get('sex'),
      name: searchParams.get('query'),
      centuries: searchParams.getAll('centuries'),
    };

    return getFilteredPeople(people, filters);
  }, [people, searchParams]);

  const sortedPeople = useMemo(() => {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    return getSortedPeople(filteredPeople, sort, order);
  }, [searchParams, filteredPeople]);

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
              {isLoader && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoader && !isError && !filteredPeople.length && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {false && <p>There are no people on the server</p>}

              {!isLoader && !!sortedPeople.length && !isError && (
                <PeopleTable people={sortedPeople} originPeople={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
