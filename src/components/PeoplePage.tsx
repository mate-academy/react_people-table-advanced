import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';
  const sexFilter = searchParams.get('sex') || '';
  const centuriesFilter = searchParams.getAll('centuries');

  useEffect(() => {
    getPeople()
      .then(fetchedPeople => {
        setPeople(fetchedPeople);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const filteredPeople = people
    .filter(person => {
      const nameMatches = person.name.toLowerCase().includes(query);
      const motherMatches = person.motherName?.toLowerCase().includes(query);
      const fatherMatches = person.fatherName?.toLowerCase().includes(query);
      const sexMatches = sexFilter
        ? person.sex.toLowerCase() === sexFilter.toLowerCase()
        : true;

      const century = Math.floor(person.born / 100) + 1;
      const centuryMatches =
        centuriesFilter.length === 0 ||
        centuriesFilter.includes(String(century));

      const queryMatches = nameMatches || motherMatches || fatherMatches;

      return queryMatches && sexMatches && centuryMatches;
    })
    .sort((a, b) => {
      let result = 0;

      switch (sortBy) {
        case 'name':
          result = a.name.localeCompare(b.name);
          break;
        case 'born':
          result = a.born - b.born;
          break;
        case 'died':
          result = a.died - b.died;
          break;
        case 'sex':
          result = a.sex.localeCompare(b.sex);
          break;
        default:
          break;
      }

      return order === 'desc' ? -result : result;
    });

  const handleCenturyChange = (centuries: string[]) => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    centuries.forEach(c => params.append('centuries', c));
    setSearchParams(params);
  };

  const handleFilterChange = (name: string) => {
    const params = new URLSearchParams(searchParams);

    if (name.trim()) {
      params.set('query', name.trim());
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort) {
      params.set('sort', sort);
    } else {
      params.delete('sort');
    }

    setSearchParams(params);
  };

  const handleSexChange = (sex: string) => {
    const params = new URLSearchParams(searchParams);

    if (sex) {
      params.set('sex', sex);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                name={query}
                sortBy={sortBy}
                selectedCenturies={centuriesFilter}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onCenturyChange={handleCenturyChange}
                onSexChange={handleSexChange}
                selectedSex={sexFilter}
                onReset={handleResetFilters}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {!loading && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!loading && !error && <PeopleTable people={filteredPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
