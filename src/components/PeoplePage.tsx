import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterSex, setFilterSex] = useState('');
  const [query, setQuery] = useState('');
  const [centuries, setCenturies] = useState<string[]>([]);
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    fetch('/api/people.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        return response.json();
      })
      .then(data => {
        setPeopleFromServer(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const hasPeople = peopleFromServer.length > 0;

  // Фильтрация по полу
  const filteredPeople = peopleFromServer.filter(
    person =>
      (!filterSex || person.sex === filterSex) &&
      (!query || person.name.toLowerCase().includes(query.toLowerCase())) &&
      (centuries.length === 0 ||
        centuries.some(
          century =>
            person.born >= (+century - 1) * 100 + 1 &&
            person.born <= +century * 100,
        )),
  );
  const sortedData = [...filteredPeople].sort((a, b) => {
    if (sortBy) {
      const aValue = a[sortBy as keyof Person] as string;
      const bValue = b[sortBy as keyof Person] as string;

      if (aValue < bValue) {
        return order === 'asc' ? 1 : -1;
      }

      if (aValue > bValue) {
        return order === 'asc' ? -1 : 1;
      }
    }

    return 0;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && (
              <PeopleFilters
                setCenturies={setCenturies}
                setQuery={setQuery}
                setFilterSex={setFilterSex}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && !error && <Loader />}

              {error && !loading && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !hasPeople && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && hasPeople && sortedData.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && sortedData.length > 0 && (
                <PeopleTable peopleFromServer={sortedData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
