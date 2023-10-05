import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person, SearchParameters, SortValues } from '../types';
import { getPeople } from '../api';
import { getPreparedPersons } from '../utils/getPreparedPersons';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isErrorToGetPeople, setIsErrorToGetPeople] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const sort = searchParams.get(SearchParameters.Sort) as SortValues || '';
  const order = searchParams.get(SearchParameters.Order) || '';
  const centuries = searchParams.getAll(SearchParameters.Centuries) || [];
  const query = searchParams.get(SearchParameters.Query) || '';
  const sex = searchParams.get(SearchParameters.Sex) || '';

  const isNotPeopleOnServer
    = !people.length
    && !isLoading
    && !isErrorToGetPeople;

  const isErrorMessageVisible = isErrorToGetPeople && !isLoading;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((allPersons) => {
        const PeopleWithRelatives = getPreparedPersons(allPersons);

        setPeople(PeopleWithRelatives);
      })
      .catch(() => {
        setIsErrorToGetPeople(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const sortPeople = (sortType: SortValues,
    isOrder: string,
    allPeople: Person[]) => {
    const copyAllPeople = [...allPeople];

    if (sortType) {
      copyAllPeople.sort((a, b) => {
        switch (sortType) {
          case SortValues.Name:
            return a.name.localeCompare(b.name);
          case SortValues.Sex:
            return a.sex.localeCompare(b.sex);
          case SortValues.Born:
            return a.born - b.born;
          case SortValues.Died:
            return a.died - b.died;
          default:
            return 0;
        }
      });
    }

    if (isOrder === 'desc') {
      copyAllPeople.reverse();
    }

    return copyAllPeople;
  };

  function filterPeople(allPeople: Person[],
    queryFilter: string,
    filterBySex: string,
    filterByCenturies: string[]) {
    let copyAllPeople = [...allPeople];

    if (queryFilter) {
      copyAllPeople = copyAllPeople.filter(man => man.name.toLowerCase()
        .includes(queryFilter.toLowerCase()));
    }

    if (filterBySex) {
      copyAllPeople = copyAllPeople.filter(man => man.sex === filterBySex);
    }

    if (filterByCenturies.length) {
      copyAllPeople = copyAllPeople.filter(person => {
        const personCenturyBorn = Math.ceil(person.born / 100);

        return filterByCenturies.includes(personCenturyBorn.toString());
      });
    }

    return copyAllPeople;
  }

  const filteredPeople = filterPeople(people, query, sex, centuries);
  const isSortedPeople = sortPeople(sort, order, filteredPeople);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isErrorMessageVisible && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNotPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!filteredPeople.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!filteredPeople.length && (
                <PeopleTable
                  people={isSortedPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
