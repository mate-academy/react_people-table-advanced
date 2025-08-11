import React, { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true);
        const data = await getPeople();

        setPeople(data);
        setLoading(false);
      } catch (e) {
        setError('Something went wrong');
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');

  const isInSelectedCenturies = (person: Person) => {
    if (selectedCenturies.length === 0) {
      return true;
    }

    return selectedCenturies.some(century => {
      const startYear = (parseInt(century, 10) - 1) * 100 + 1;
      const endYear = startYear + 99;

      return person.born >= startYear && person.born <= endYear;
    });
  };

  const filteredPeople = people.filter(person => {
    const matchesQuery = person.name.toLowerCase().includes(query);
    const matchesSex = !sex || person.sex === sex;
    const matchesCentury = isInSelectedCenturies(person);

    return matchesQuery && matchesSex && matchesCentury;
  });

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
              {loading && <Loader />}
              {error && <p data-cy="peopleLoadingError">{error}</p>}
              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!loading && !error && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} />
              )}
              {!loading && !error && filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
