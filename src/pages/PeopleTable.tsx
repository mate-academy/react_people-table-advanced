/* eslint-disable max-len */
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person, SortParams } from '../types';
import { getPeople } from '../api';
import { PersonRow } from './PersonRow';
import { getPeopleWithParents } from '../utils/getPeopleWithParents';
import { getPreparedPeople } from '../utils/getPreparedPeople';
import { SortLink, Loader, PeopleFilters } from '../components';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const peopleWithParents = useMemo(() => {
    return getPeopleWithParents(people);
  }, [people]);

  const fieldsWithSort = useMemo(() => ['Name', 'Sex', 'Born', 'Died'], []);

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') as SortParams || '';
  const order = searchParams.get('order') || '';

  const preparedPeople = getPreparedPeople(
    peopleWithParents,
    {
      query,
      sex,
      centuries,
    },
    sort,
    order,
  );
  const isLoadWithoutErrors = !isError && !isLoading;

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

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

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(isLoadWithoutErrors && people.length === 0) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isLoadWithoutErrors && (
                <table
                  data-cy="peopleTable"
                  className="table is-striped is-hoverable is-narrow is-fullwidth"
                >
                  <thead>
                    <tr>
                      {fieldsWithSort.map(field => (
                        <th key={field}>
                          <span className="is-flex is-flex-wrap-nowrap">
                            {field}
                            <SortLink
                              sortField={sort}
                              field={field}
                              order={order}
                            />
                          </span>
                        </th>
                      ))}

                      <th>Mother</th>
                      <th>Father</th>
                    </tr>
                  </thead>

                  <tbody>
                    {preparedPeople.map(person => (
                      <PersonRow
                        key={person.slug}
                        person={person}
                      />
                    ))}
                  </tbody>
                </table>
              )}

            </div>
          </div>
        </div>
      </div>
    </>

  );
};
