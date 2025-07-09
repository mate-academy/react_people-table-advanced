import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const fetchPeople = async () => {
    try {
      setLoading(true);
      const data = await getPeople();

      setPeople(data);
    } catch {
      setErrorMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries').map(Number);
  const sex = searchParams.get('sex');
  const sortField = searchParams.get('sort');
  const isDesc = searchParams.get('order') === 'desc';

  const filteredPeople = people
    .filter(person => {
      const matchesQuery =
        !query ||
        person.name.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query);

      const bornCentury = Math.ceil(person.born / 100);
      const matchesCentury =
        centuries.length === 0 || centuries.includes(bornCentury);

      const matchesSex = !sex || person.sex === sex;

      return matchesQuery && matchesCentury && matchesSex;
    })
    .sort((a, b) => {
      if (!sortField) {
        return 0;
      }

      const aValue = a[sortField as keyof Person];
      const bValue = b[sortField as keyof Person];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return isDesc
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return isDesc ? bValue - aValue : aValue - bValue;
      }

      return 0;
    });

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {loading && <Loader />}

                {errorMessage && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    {errorMessage}
                  </p>
                )}

                {!loading && people.length === 0 && !errorMessage && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {people.length > 0 && filteredPeople.length === 0 && (
                  <div className="notification is-warning has-text-centered">
                    There are no people matching the current search criteria
                  </div>
                )}

                {!loading && people.length > 0 && (
                  <PeopleTable people={filteredPeople} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
