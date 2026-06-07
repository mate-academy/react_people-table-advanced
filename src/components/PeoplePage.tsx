import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTableFix } from './PeopleTableFix';
import { Person } from '../types';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);

  const name = searchParams.get('query') ?? '';
  const sex = searchParams.get('sex') ?? '';
  const centuries = searchParams.getAll('centuries').map(Number);

  useEffect(() => {
    getPeople()
      .then(data => {
        const linkedPeople = data.map(person => ({
          ...person,
          mother: data.find(p => p.name === person.motherName),
          father: data.find(p => p.name === person.fatherName),
        }));

        setPeople(linkedPeople);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {!loading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!loading && error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {!loading && people.length > 0 && (
                <PeopleTableFix
                  name={name}
                  sex={sex}
                  century={centuries}
                  people={people}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
