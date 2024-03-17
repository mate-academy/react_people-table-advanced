import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../../Loader';
import { PeopleFilters } from '../../PeopleFilter';
import { getPeople } from '../../../api';
import { PeopleTable } from '../../PeopleTable/PeopleTable';
import { getFilteredPeople } from '../../../utils/filteredPeople';
import { getSortedPeople } from '../../../utils/sortedPeople';
import { FilterParams, Person, SortParams } from '../../../types';

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
      sex: searchParams.get(FilterParams.Sex),
      name: searchParams.get(FilterParams.Query),
      centuries: searchParams.getAll(FilterParams.Centuries),
    };

    return getFilteredPeople(people, filters);
  }, [people, searchParams]);

  const sortedPeople = useMemo(() => {
    const sort = searchParams.get(SortParams.Sort);
    const order = searchParams.get(SortParams.Order);

    return getSortedPeople(filteredPeople, sort, order);
  }, [searchParams, filteredPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoader && !!people.length && !isError && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoader && <Loader />}

              {isError && !isLoader && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoader && !isError && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filteredPeople.length && !isLoader && !isError && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoader && !!filteredPeople.length && !isError && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
