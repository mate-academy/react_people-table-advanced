import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import * as usersServise from '../api';
import { Loader } from './Loader';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { getSortedPeople } from '../utils/getSortedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);

    usersServise.getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = useMemo(() => {
    return people.map(person => {
      const mother = people.find(p => p.name === person.motherName) || null;
      const father = people.find(p => p.name === person.fatherName) || null;

      return { ...person, mother, father };
    });
  }, [people]);

  const sortedPeople = useMemo(() => {
    return getSortedPeople(
      preparedPeople,
      sex,
      query,
      centuries,
      sort,
      order,
    );
  }, [people, sex, query, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isError && !isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading
                ? <Loader />
                : (
                  <>
                    {isError && (
                      <p
                        data-cy="peopleLoadingError"
                        className="has-text-danger"
                      >
                        Something went wrong
                      </p>
                    )}

                    {people.length === 0 && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}

                    {!isError && (
                      <PeopleTable
                        people={sortedPeople}
                      />
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
