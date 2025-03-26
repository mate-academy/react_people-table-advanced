import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [filterSex, setFilterSex] = useState<'all' | 'm' | 'f'>('all');
  const [filterCentury, setFilterCentury] = useState<
  '16' | '17' | '18' | '19' | '20' | ''
  >('');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredPeople = people.filter(person => {
    const matchesSex = filterSex === 'all' || person.sex === filterSex;
    const matchesCentury =
      filterCentury === '' ||
      Math.floor(person.born / 100) + 1 === +filterCentury;

    return matchesSex && matchesCentury;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              setFilterSex={setFilterSex}
              setFilterCentury={setFilterCentury}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

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

              {!loading && !errorMessage && (
                <PeopleTable people={filteredPeople} />
              )}
              <p>There are no people matching the current search criteria</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
