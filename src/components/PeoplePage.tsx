import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonRow } from './PersonRow';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { peopleFilter } from '../utils/peopleUtils';
import { PeopleTableHeader } from './PeopleTableHeader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortField = ['name', 'sex', 'born', 'died'];

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
      })
      .catch(() => {
        setErrorMessage('Unable to load people');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const peopleWithParents = useMemo(() => people.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
  })),
  [people]);

  const visiblePeople = useMemo(() => peopleFilter(peopleWithParents, {
    query, sex, centuries, sort, order,
  }),
  [query, sex, centuries, sort, order, peopleWithParents]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
          <div className="box table-container">
            {loading && <Loader />}
            {!errorMessage && !loading && people.length > 0 && (
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <PeopleTableHeader
                  sortField={sortField}
                  sort={sort}
                  order={order}
                />
                <tbody>
                  {visiblePeople.map(person => (
                    <PersonRow
                      person={person}
                      key={person.slug}
                    />
                  ))}
                </tbody>
              </table>
            )}

            {errorMessage && !loading && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {errorMessage}
              </p>
            )}
            {!errorMessage && !loading && !people.length && (
              <p data-cy="noPeopleMessage" className="has-text-danger">
                There are no people on the server
              </p>
            )}
            {!errorMessage && !loading && !visiblePeople.length && (
              <p data-cy="noPeopleMessage" className="has-text-danger">
                No people for your criteria
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
