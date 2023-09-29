import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { FilterParams } from '../types/FilterParams';
import { SortParams } from '../types/SortParams';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get(FilterParams.Query) || '';
  const sex = searchParams.get(FilterParams.Sex) || '';
  const centuries = searchParams.getAll(FilterParams.Centuries) || [];
  const sort = searchParams.get(FilterParams.Sort) || '';
  const order = searchParams.get(FilterParams.Order) || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPeople();

        setPeople(data);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPreparedPeople = useMemo(() => {
    let preparedPeople = people.map((person) => {
      const mother = people.find((women) => women.name === person.motherName);
      const father = people.find((man) => man.name === person.fatherName);

      return {
        ...person,
        mother,
        father,
      };
    });

    if (query) {
      preparedPeople = preparedPeople.filter((person) => {
        const queryNormalized = query.toLowerCase().trim();

        return (
          person.name.toLowerCase().includes(queryNormalized)
          || person.fatherName
            ?.toLowerCase().includes(queryNormalized)
          || person.motherName
            ?.toLowerCase().includes(queryNormalized)
        );
      });
    }

    if (sex) {
      preparedPeople = preparedPeople.filter((person) => {
        return person.sex === sex;
      });
    }

    if (centuries.length) {
      preparedPeople = preparedPeople.filter((person) => {
        return centuries.find((century) => {
          return Math.ceil(person.born / 100) === +century;
        });
      });
    }

    if (sort) {
      switch (sort) {
        case SortParams.Name:
        case SortParams.Sex:
          preparedPeople = [...preparedPeople].sort(
            (person1, person2) => person1[sort].localeCompare(person2[sort]),
          );
          break;

        case SortParams.Born:
        case SortParams.Died:
          preparedPeople = [...preparedPeople].sort(
            (person1, person2) => +person1[sort] - +person2[sort],
          );
          break;

        default:
          throw new Error('Sorting went wrong...');
      }
    }

    if (order) {
      preparedPeople = preparedPeople.reverse();
    }

    return preparedPeople;
  }, [people, query, sex, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>

              <div className="column">
                <div className="box table-container">
                  {hasError ? (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  ) : (
                    <>
                      {!!people.length && !!getPreparedPeople.length && (
                        <PeopleTable people={getPreparedPeople} />
                      )}

                      {!people.length && (
                        <p data-cy="noPeopleMessage">
                          There are no people on the server
                        </p>
                      )}

                      {!getPreparedPeople.length && (
                        <p>
                          There are no people
                          matching the current search criteria
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
