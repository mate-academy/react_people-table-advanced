import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import {
  CenturiesOptions,
  OrderOption,
  SexOptions,
  SortOptions,
} from '../utils/data';
import { getSearchWith } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [currentPeople, setCurrentPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sex: SexOptions = searchParams.get('sex') as SexOptions || '';
  const centuries: CenturiesOptions[] = searchParams
    .getAll('centuries') as CenturiesOptions[] || [];
  const query = searchParams.get('query') || '';
  const sort: SortOptions = searchParams.get('sort') as SortOptions || '';
  const order: OrderOption = searchParams.get('order') as OrderOption || '';

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let newList = [...people];

    if (sex) {
      switch (sex) {
        case SexOptions.MALE:
          newList = newList.filter(person => person.sex === SexOptions.MALE);
          break;
        case SexOptions.FEMALE:
          newList = newList.filter(person => person.sex === SexOptions.FEMALE);
          break;
        default:
          break;
      }
    }

    if (centuries.length) {
      newList = newList.filter(person => centuries
        .includes(`${Math.ceil(person.born / 100)}` as CenturiesOptions));
    }

    if (query) {
      const normalizedQuery = query.toLowerCase();

      newList = newList.filter(person => person.name.toLowerCase()
        .includes(normalizedQuery)
        || person.motherName?.toLowerCase()
          .includes(normalizedQuery)
        || person.fatherName?.toLowerCase()
          .includes(normalizedQuery));
    }

    if (sort) {
      newList.sort((firstPerson, secondPerson) => {
        if (sort === SortOptions.NAME || sort === SortOptions.SEX) {
          return (order ? -1 : 1)
            * firstPerson[sort].localeCompare(secondPerson[sort]);
        }

        if (sort === SortOptions.BORN || sort === SortOptions.DIED) {
          return (order ? -1 : 1)
            * (firstPerson[sort] - secondPerson[sort]);
        }

        return 0;
      });
    }

    setCurrentPeople(newList);
  },
  [people, searchParams]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const curQuery = event.target.value.trimStart() || null;

    setSearchParams(getSearchWith(searchParams, { query: curQuery }));
  };

  const tableValidate = !isLoading && !isError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !!people.length && !isError
              && (
                <PeopleFilters
                  sex={sex}
                  centuries={centuries}
                  query={query}
                  handleQueryChange={handleQueryChange}
                />
              )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {tableValidate && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {tableValidate && !currentPeople.length && !!people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {tableValidate && !!currentPeople.length && (
                <PeopleTable
                  people={currentPeople}
                  sort={sort}
                  order={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
