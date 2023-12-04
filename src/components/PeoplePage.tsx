import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import {
  FilterParams, ORDER_PARAM, OrderType, Person, SORT_PARAM, SortFields,
} from '../types';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const filteredPeople = () => {
    const sort = searchParams.get(SORT_PARAM);
    const isDesc = searchParams.get(ORDER_PARAM) === OrderType.DESC;
    const sex = searchParams.get(FilterParams.SEX);
    const nameQuery = searchParams.get(FilterParams.NAME);
    const centuries = searchParams.getAll(FilterParams.CENTURIES) || [];
    let filtered = [...people];

    if (sort) {
      switch (sort) {
        case SortFields.NAME || SortFields.SEX:
          filtered.sort((a, b) => a[sort].localeCompare(b[sort]));
          break;
        case SortFields.BORN || SortFields.DIED:
          filtered.sort((a, b) => a[sort] - b[sort]);
          break;
        default:
          break;
      }

      if (isDesc) {
        filtered.reverse();
      }
    }

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    if (nameQuery) {
      filtered = filtered.filter(person => {
        return person.name.includes(nameQuery)
          || person.motherName?.includes(nameQuery)
          || person.fatherName?.includes(nameQuery);
      });
    }

    if (centuries.length) {
      filtered = filtered.filter(person => {
        return centuries.includes(
          String(Math.ceil(person.born / 100)),
        );
      });
    }

    return filtered;
  };

  const preparedPeople = filteredPeople();

  const isNotFetching = !isLoading && !hasError;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        const mappedData = data.map(person => ({
          ...person,
          mother: data.find(mother => mother.name === person.motherName),
          father: data.find(father => father.name === person.fatherName),
        }));

        setPeople(mappedData);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!!people.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isNotFetching && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNotFetching && !!people.length && !preparedPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isNotFetching && !!preparedPeople.length && (
                <PeopleTable people={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
