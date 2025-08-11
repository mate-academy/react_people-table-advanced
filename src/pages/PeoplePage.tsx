import { useEffect, useMemo, useState } from 'react';

import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const fetchPeopleData = async () => {
    try {
      const response = await fetch(
        'https://mate-academy.github.io/react_people-table/api/people.json',
      );

      const data = await response.json();

      setPeopleData(data);
    } catch {
      setError('Data loading error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeopleData();
  }, []);

  console.log(peopleData);

  const filteredPeople = useMemo(() => {
    const query = searchParams.get('query')?.toLowerCase() || '';
    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('centuries').map(Number);

    return peopleData.filter(person => {
      const matchesQuery = !query || person.name.toLowerCase().includes(query);
      const matchesSex = !sex || person.sex === sex;
      const matchesCentury =
        !centuries.length || centuries.includes(Math.ceil(person.died / 100));

      return matchesQuery && matchesSex && matchesCentury;
    });
  }, [peopleData, searchParams]);

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

              {!isLoading && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!isLoading && !error && peopleData.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading &&
                !error &&
                peopleData.length > 0 &&
                filteredPeople.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {!isLoading && !error && filteredPeople.length > 0 && (
                <PeopleTable filteredPeople={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
