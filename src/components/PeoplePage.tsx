import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const preparedPeople = people.map(personValue => ({
    ...personValue,
    mother: people.find(human => human.name === personValue.motherName),
    father: people.find(human => human.name === personValue.fatherName),
  }));

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleFilter = () => {
    let filteredPeople = [...preparedPeople];
    const query = searchParams.get('query') || '';
    const centuries = searchParams.getAll('centuries') || [];
    const sex = searchParams.get('sex') || '';

    if (query) {
      filteredPeople = filteredPeople.filter(person =>
        person.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person => {
        return centuries.includes(`${Math.ceil(person.born / 100)}`);
      });
    }

    if (sex) {
      switch (sex) {
        case 'm':
          return filteredPeople.filter(person => person.sex === 'm');
        case 'f':
          return filteredPeople.filter(person => person.sex === 'f');
        default:
          return filteredPeople;
      }
    }

    return filteredPeople;
  };

  const handleSort = () => {
    const sortedPeople = handleFilter();
    const sort = (searchParams.get('sort') || '') as keyof Person;
    const order = searchParams.get('order') || '';

    const newOutPut = sortedPeople.sort((a: Person, b: Person) => {
      const valueA = a[sort];
      const valueB = b[sort];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB);
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return valueA - valueB;
      }

      return 0;
    });

    if (sort && !order) {
      return newOutPut;
    }

    if (sort && order) {
      return newOutPut.reverse();
    }

    return [...sortedPeople];
  };

  const sortedPeople = handleSort();

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters handleFilter={handleFilter} />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {isError && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}

                  {!people.length && !isError && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {!!people.length && !isError && (
                    <PeopleTable preparedPeople={sortedPeople} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
