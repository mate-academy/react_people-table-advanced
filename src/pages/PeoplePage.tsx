import { useEffect, useState } from 'react';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const hasPeopleLoaded = !!people?.length && !loading;

  useEffect(() => {
    setError(false);
    setLoading(true);
    getPeople()
      .then((data) => {
        const updatedPeople = data.map(person => {
          const mother = person.motherName
            ? data.find(p => p.name === person.motherName) : undefined;
          const father = person.fatherName
            ? data.find(p => p.name === person.fatherName) : undefined;

          return { ...person, mother, father };
        });

        setPeople(updatedPeople);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {hasPeopleLoaded && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people?.length === 0 && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>

              {hasPeopleLoaded && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
