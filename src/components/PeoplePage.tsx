/* eslint-disable prettier/prettier */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(human => {
        setPeople(human);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const filteredPeople = people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (query) {
      const lowerQuery = query.toLowerCase();
      const matchesName = person.name.toLowerCase().includes(lowerQuery);
      const matchesMother = person.motherName
        ?.toLowerCase()
        .includes(lowerQuery);
      const matchesFather = person.fatherName
        ?.toLowerCase()
        .includes(lowerQuery);

      if (!matchesName && !matchesMother && !matchesFather) {
        return false;
      }
    }

    if (centuries.length > 0) {
      const personCentury = Math.ceil(person.born / 100);

      if (!centuries.includes(String(personCentury))) {
        return false;
      }
    }

    return true;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading &&
                !error &&
                people.length > 0 &&
                filteredPeople.length === 0 && (
                <p>
                    There are no people matching the current search criteria
                </p>
              )}

              {!loading && !error && filteredPeople.length > 0 && (
                <PeopleTable
                  people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
