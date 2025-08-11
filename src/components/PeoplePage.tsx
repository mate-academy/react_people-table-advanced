import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { getPreparedPeople } from '../utils/getPreparedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [searchParams] = useSearchParams();

  const filteredByQuery = searchParams.get('query') || '';
  const filteredBySex = searchParams.get('sex') || '';
  const filteredByCenturies = searchParams.getAll('centuries') || [];
  const sortedBy = searchParams.get('sort') || '';
  const orderedBy = (searchParams.get('order') || 'asc') as 'asc' | 'desc';

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(allPeople => {
        const preparedPeople = allPeople.map(person => ({
          ...person,
          mother: allPeople.find(mother => mother.name === person.motherName),
          father: allPeople.find(father => father.name === person.fatherName),
        }));

        setPeople(preparedPeople);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => setLoading(false));
  }, []);

  const preparedPeople = getPreparedPeople(
    people,
    filteredByQuery,
    filteredByCenturies,
    filteredBySex,
    sortedBy,
    orderedBy,
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!loading && !error && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && !preparedPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !error && !!preparedPeople.length && (
                <PeopleTable preparedPeople={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
