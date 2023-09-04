import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../../types';
import { getPeople } from '../../api';

import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';
import { QueryParams } from '../../types/QueryParams';
import { SortTypes } from '../../types/SortTypes';
import { PeopleFilter } from './PeopleFilter/PeopleFilter';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  const query = searchParams.get(QueryParams.Query) || '';
  const sex = searchParams.get(QueryParams.Sex) || '';
  const sort = searchParams.get(QueryParams.Sort) || '';
  const order = searchParams.get(QueryParams.Order) || '';
  const centuries = searchParams.getAll(QueryParams.Centuries) || [];

  const filteredPeople = useMemo(() => {
    let filterResult = [...people];

    if (query) {
      const queryToLower = query.toLowerCase();

      filterResult = filterResult.filter(
        currentPerson => currentPerson.name.toLowerCase().includes(queryToLower)
        || currentPerson.motherName?.toLowerCase().includes(queryToLower)
        || currentPerson.fatherName?.toLowerCase().includes(queryToLower),
      );
    }

    if (sex) {
      filterResult = filterResult.filter(
        currentPerson => currentPerson.sex === sex,
      );
    }

    if (centuries.length) {
      filterResult = filterResult.filter(currentPerson => centuries.includes(
        Math.ceil(currentPerson.born / 100).toString(),
      ));
    }

    if (sort) {
      filterResult = [...filterResult].sort((person1, person2) => {
        const first = order ? person1 : person2;
        const second = order ? person2 : person1;

        switch (sort) {
          case SortTypes.Name:
            return second.name.localeCompare(first.name);

          case SortTypes.Sex:
            return second.sex.localeCompare(first.sex);

          case SortTypes.Born:
            return +second.born - +first.born;

          case SortTypes.Died:
            return +second.died - +first.died;

          default:
            return 0;
        }
      });
    }

    return filterResult;
  }, [query, sex, centuries, sort, order]);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">
        People Page
      </h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="columns is-desktop is-flex-direction-row-reverse">

              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilter value={query} />
              </div>

              <div className="column">
                <div className="box table-container">
                  {isError ? (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  ) : (
                    <>
                      {people.length ? (
                        <>
                          {filteredPeople.length ? (
                            <PeopleTable people={filteredPeople} />
                          ) : (
                            <p>
                              There are no people matching
                              the current search criteria
                            </p>
                          )}
                        </>
                      ) : (
                        <p data-cy="noPeopleMessage">
                          There are no people on the server
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
