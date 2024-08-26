import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterSex, setFilterSex] = useState('');

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

  // Фильтрация людей на основе пола
  const filteredPeople = filterSex
    ? peopleFromServer.filter(person => person.sex === filterSex)
    : peopleFromServer;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters setFilterSex={setFilterSex} />
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

              {!loading && hasPeople && filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && filteredPeople.length > 0 && (
                <PeopleTable peopleFromServer={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
