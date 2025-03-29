import React, { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || 'all';
  const centuries = searchParams.getAll('century');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  const filteredPeople = people.filter(person => {
    const matchesQuery = query
      ? person.name.toLowerCase().includes(query.toLowerCase())
      : true;

    const matchesSex = sex === 'all' || person.sex === sex;

    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(Math.floor(person.born / 100) + 1 + '');

    return matchesQuery && matchesSex && matchesCentury;
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        {loading && <Loader />}
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              {!loading && !errorMessage && (
                <PeopleFilters
                  query={query}
                  sex={sex}
                  centuries={centuries}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              )}
            </div>

            <div className="column">
              <div className="box table-container">
                {!loading && !errorMessage && people.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {errorMessage && !loading && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {!loading && !errorMessage && filteredPeople.length > 0 && (
                  <PeopleTable
                    people={filteredPeople}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                  />
                )}

                {!loading && !errorMessage && filteredPeople.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
