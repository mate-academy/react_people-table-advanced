import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person, SortParameters } from '../types';
import { getPeople } from '../api';
import { PersonTableRow } from './PersonTableRow';
import { getPeopleWithParents } from '../utils/peopleWithParents';
import { getPreparedPeople } from '../utils/preparedPeople';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { SortLinks } from './SortLinks';

const sortByField = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const peopleWithParents: Person[] = useMemo(() => {
    return getPeopleWithParents(people);
  }, [people]);

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') as SortParameters || '';
  const order = searchParams.get('order') || '';

  const preparedPeople = useMemo(() => {
    return getPreparedPeople(
      peopleWithParents,
      {
        query,
        sex,
        centuries,
      },
      sort,
      order,
    );
  }, [peopleWithParents, query, sex, centuries, sort, order]);

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
            {!isError && !isLoading && <PeopleFilters />}
          </div>
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(!isError && !isLoading && preparedPeople.length === 0) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(!isError && !isLoading && preparedPeople.length !== 0) && (
                <table
                  data-cy="peopleTable"
                  // eslint-disable-next-line max-len
                  className="table is-striped is-hoverable is-narrow is-fullwidth"
                >
                  <thead>
                    <tr>
                      {sortByField.map(field => (
                        <th key={field}>
                          <span className="is-flex is-flex-wrap-nowrap">
                            {field}
                            <SortLinks
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
                      <PersonTableRow
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
