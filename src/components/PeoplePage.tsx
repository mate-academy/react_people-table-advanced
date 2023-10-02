import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { SearchParams } from '../types/SearchParams';

const getFilteredPeople = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
  sortField: string | null,
  order: string | null,
): Person[] => {
  let preparedPeople = [...people];

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    const getCentury = (person: Person) => Math.ceil(person.born / 100);

    preparedPeople = preparedPeople.filter(
      person => centuries.includes(
        getCentury(person).toString(),
      ),
    );
  }

  if (query) {
    const toCaseQuery = query.toLowerCase();

    preparedPeople = preparedPeople
      .filter(person => person.name.includes(toCaseQuery)
        || person.motherName?.includes(toCaseQuery)
        || person.fatherName?.includes(toCaseQuery));
  }

  if (sortField) {
    preparedPeople.sort((person1, person2) => {
      switch (sortField) {
        case 'name':
        case 'sex':
          return person1[sortField].localeCompare(person2[sortField]);

        case 'born':
        case 'died':
          return person1[sortField] - person2[sortField];

        default:
          return 0;
      }
    });

    if (order === 'desc') {
      preparedPeople.reverse();
    }
  }

  return preparedPeople;
};

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get(SearchParams.SEX);
  const query = searchParams.get(SearchParams.QUERY);
  const centuries = searchParams.getAll(SearchParams.CENTURIES);
  const sortField = searchParams.get(SearchParams.SORT);
  const order = searchParams.get(SearchParams.ORDER);

  const preparedPeople = getFilteredPeople(
    people,
    sex,
    query,
    centuries,
    sortField,
    order,
  );

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        setPeople(peopleFromServer);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  });

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
              {isLoading && (
                <Loader />
              )}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length && (
                <PeopleTable people={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
