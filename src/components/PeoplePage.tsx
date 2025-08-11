import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { getPreparedPeople } from '../utils/filterPeople';

enum FilterOptions {
  sex = 'sex',
  query = 'query',
  centuries = 'centuries',
  sort = 'sort',
  order = 'order',
}

const getParent = (peopleList: Person[], name: string | null) => {
  return peopleList.find(person => person.name === name);
};

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  const visiblePeople = useMemo(() => {
    const options = {
      sex: searchParams.get(FilterOptions.sex),
      query: searchParams.get(FilterOptions.query),
      centuries: searchParams.getAll(FilterOptions.centuries),
      sort: searchParams.get(FilterOptions.sort),
      order: searchParams.get(FilterOptions.order),
    };

    return getPreparedPeople(peopleList, options);
  }, [peopleList, searchParams]);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(result => {
        setPeopleList(
          result.map(person => ({
            ...person,
            mother: getParent(result, person.motherName),
            father: getParent(result, person.fatherName),
          })),
        );
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const hasSearchMatch =
    !!peopleList.length && !visiblePeople.length && !isError && !isLoading;

  const isPeopleTable =
    !!peopleList.length && !isLoading && !isError && !hasSearchMatch;

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
              {isLoading && <Loader />}
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {hasSearchMatch && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!peopleList.length && !isLoading && !isError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isPeopleTable && <PeopleTable visiblePeople={visiblePeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
