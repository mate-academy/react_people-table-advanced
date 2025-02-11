import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { usePeopleFilters } from '../hooks/useFilter';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      try {
        const peopleData = await getPeople();

        const modifiedPeopleData = peopleData.map(person => ({
          ...person,
          mother: peopleData.find(p => p.name === person.motherName),
          father: peopleData.find(p => p.name === person.fatherName),
        }));

        setPeople(modifiedPeopleData);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const {
    filteredPeople,
    query,
    selectedCenturies,
    updateQuery,
    toggleCentury,
    updateSort,
    updateSex,
    resetAllFilters,
  } = usePeopleFilters(people);
  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && (
              <PeopleFilters
                query={query}
                updateQuery={updateQuery}
                updateSex={updateSex}
                selected={selectedCenturies}
                toggleCentury={toggleCentury}
                resetAllFilters={resetAllFilters}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && !loading && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {filteredPeople.length > 0 ? (
                <PeopleTable people={filteredPeople} updateSort={updateSort} />
              ) : (
                <div data-cy="box table-container">
                  There are no people matching the current search criteria
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
