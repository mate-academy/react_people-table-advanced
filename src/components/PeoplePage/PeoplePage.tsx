import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { QueryParams } from '../../types/QueryParams';
import { SortTypes } from '../../types/SortTypes';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get(QueryParams.Query) || '';
  const sex = searchParams.get(QueryParams.Sex) || '';
  const centuries = searchParams.getAll(QueryParams.Centuries) || [];
  const sort = searchParams.get(QueryParams.Sort) || '';
  const order = searchParams.get(QueryParams.Order) || '';

  const filteredPeople = useMemo(() => {
    let filtered = [...people];

    if (query) {
      const lowerQuery = query.toLowerCase();

      filtered = filtered.filter(
        person => person.name.toLowerCase().includes(lowerQuery)
        || person.motherName?.toLowerCase().includes(lowerQuery)
        || person.fatherName?.toLowerCase().includes(lowerQuery),
      );
    }

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      filtered = filtered.filter(person => centuries.includes(
        Math.ceil(person.born / 100).toString(),
      ));
    }

    if (sort) {
      filtered = [...filtered].sort((person1, person2) => {
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

    return filtered;
  }, [query, sex, centuries, sort, order]);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {isLoadingError ? (
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
    </>
  );
};
