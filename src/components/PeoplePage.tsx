import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export enum SortingType {
  name = 'name',
  nameReversed = 'nameReversed',
  sex = 'sex',
  sexReversed = 'sexReversed',
  born = 'born',
  bornReversed = 'bornReversed',
  died = 'died',
  diedReversed = 'diedReversed',
}

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const filterBySex = searchParams.get('sex') || '';
  const filterByQuery = searchParams.get('query') || '';
  const filterByCenturies = searchParams.getAll('centuries');
  const sortBy = searchParams.get('sortBy') || '';

  useEffect(() => {
    setIsLoadingError(false);
    setIsLoading(true);

    getPeople()
      .then(people => setPeopleList(people))
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoading(false));
  }, [setPeopleList]);

  function includesIgnoreCase(
    text: string | null | undefined,
    query: string | null | undefined,
  ): boolean {
    if (!text || !query) {
      return false;
    }

    return text.toLowerCase().includes(query.toLowerCase());
  }

  function searchByQuery(human: Person) {
    const { name, motherName, fatherName } = human;

    return (
      includesIgnoreCase(name, filterByQuery) ||
      includesIgnoreCase(motherName, filterByQuery) ||
      includesIgnoreCase(fatherName, filterByQuery)
    );
  }

  function prepareList(list: Person[]) {
    let prepared = [...list];

    if (filterBySex) {
      prepared = prepared.filter(human => human.sex === filterBySex);
    }

    if (filterByQuery) {
      prepared = prepared.filter(human => searchByQuery(human));
    }

    if (!!filterByCenturies.length) {
      prepared = prepared.filter(human =>
        filterByCenturies.includes(
          (Math.floor(human.born / 100) + 1).toString(),
        ),
      );
    }

    if (sortBy) {
      switch (sortBy) {
        case SortingType.name:
          prepared.sort((a, b) => a.name.localeCompare(b.name));
          break;

        case SortingType.nameReversed:
          prepared.sort((a, b) => b.name.localeCompare(a.name));
          break;

        case SortingType.sex:
          prepared.sort((a, b) => a.sex.localeCompare(b.sex));
          break;

        case SortingType.sexReversed:
          prepared.sort((a, b) => b.sex.localeCompare(a.sex));
          break;

        case SortingType.born:
          prepared.sort((a, b) => a.born - b.born);
          break;

        case SortingType.bornReversed:
          prepared.sort((a, b) => b.born - a.born);
          break;

        case SortingType.died:
          prepared.sort((a, b) => a.died - b.died);
          break;

        case SortingType.diedReversed:
          prepared.sort((a, b) => b.died - a.died);
          break;
      }
    }

    return prepared;
  }

  const preparedList = prepareList(peopleList);

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

              {!isLoading && isLoadingError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !isLoadingError && !peopleList.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !isLoadingError && !preparedList.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !isLoadingError && !!preparedList.length && (
                <PeopleTable
                  preparedList={preparedList}
                  sortBy={sortBy}
                  peopleList={peopleList}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
