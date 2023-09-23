import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import {
  DEFAULT_CENTURIES,
  DEFAULT_ORDER,
  DEFAULT_QUERY,
  DEFAULT_SEX,
  DEFAULT_SORT,
} from '../utils/vars';
import { getSortCategory } from '../utils/getSortCategory';
import { getMother } from '../utils/getMother';
import { getFather } from '../utils/getFather';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);

  const sort = searchParams.get('sort') || DEFAULT_SORT;
  const order = searchParams.get('order') || DEFAULT_ORDER;
  const sex = searchParams.get('sex') || DEFAULT_SEX;
  const query = searchParams.get('query') || DEFAULT_QUERY;
  const centuries = searchParams.getAll('centuries') || DEFAULT_CENTURIES;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((persons) => {
        const preparedPeople: Person[] = persons.map((person: Person) => ({
          ...person,
          mother: getMother(persons, person),
          father: getFather(persons, person),
        }));

        setPeople(preparedPeople);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => getSortCategory(people,
    sort,
    order,
    sex,
    query,
    centuries),
  [sort, order, sex, query, centuries]);

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
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <PeopleTable people={filteredPeople} />
                  {isError && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}
                  {!people.length && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                  {!filteredPeople.length && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
