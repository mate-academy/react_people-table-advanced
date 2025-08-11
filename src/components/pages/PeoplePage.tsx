import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { useEffect, useState } from 'react';
import PeopleTable from '../PeopleTable';
import { Filters, Person } from '../../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    name: '',
    gender: '',
    centuries: [],
  });

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch(
          'https://mate-academy.github.io/react_people-table/api/people.json',
        );
        const data = await response.json();

        setPeople(data);
      } catch (e) {
        setError('People loading error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const query = searchParams.get('query') || '';
    const gender = searchParams.get('sex') || 'All';
    const centuries = searchParams.getAll('centurys').map(Number);

    setFilters({
      name: query,
      gender,
      centuries,
    });
  }, [searchParams]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = people;

      if (filters.name) {
        filtered = filtered.filter(person =>
          person.name.toLowerCase().includes(filters.name.toLowerCase()),
        );
      }

      if (filters.gender && filters.gender !== 'All') {
        filtered = filtered.filter(person => person.sex === filters.gender);
      }

      if (filters.centuries.length > 0) {
        filtered = filtered.filter(person =>
          filters.centuries.includes(Math.floor((person.born - 1) / 100) + 1),
        );
      }

      setFilteredPeople(filtered);
    };

    applyFilters();
  }, [filters, people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters filters={filters} onFilterChange={setFilters} />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : error ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              ) : people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={filteredPeople} allPeople={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
