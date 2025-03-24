import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
        setError(null);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = people.filter(person => {
    const searchQuery = searchParams.get('query')?.toLowerCase() || '';
    const sexFilter = searchParams.get('sex');
    const centuries = searchParams.getAll('centuries').map(Number);

    return (
      (!searchQuery ||
        person.name.toLowerCase().includes(searchQuery) ||
        person.motherName?.toLowerCase().includes(searchQuery) ||
        person.fatherName?.toLowerCase().includes(searchQuery)) &&
      (!sexFilter || person.sex === sexFilter) &&
      (centuries.length === 0 ||
        centuries.includes(Math.ceil(person.born / 100)))
    );
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !error && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}
              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!isLoading && !error && people.length > 0 && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
