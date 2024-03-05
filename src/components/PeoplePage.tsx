import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const locaton = useLocation();
  const params = new URLSearchParams(locaton.search);
  const selectedSex = params.get('sex');
  const selectedCentury = params.getAll('centuries');
  const selectedQuery = params.get('query');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filterPeople = people.filter(person => {
    const sexFilter = !selectedSex || person.sex === selectedSex;

    let centuryFilter = true;

    if (selectedCentury.length > 0) {
      const centery = Math.ceil(person.born / 100);

      centuryFilter = selectedCentury.includes(centery.toString());
    }

    const queryFilter = person.name.toLowerCase().includes(selectedQuery || '');

    return sexFilter && centuryFilter && queryFilter;
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

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!error && !loading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/* <p>There are no people matching the current search criteria</p> */}

              {!error && !loading && people.length > 0 && (
                <PeopleTable people={filterPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
