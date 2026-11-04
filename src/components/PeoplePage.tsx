import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { getVisiblePeople } from '../utils/peopleHelper';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let active = true;

    getPeople()
      .then(data => {
        if (active) {
          setPeople(
            data.map(person => ({
              ...person,
              mother: data.find(parent => parent.name === person.motherName),
              father: data.find(parent => parent.name === person.fatherName),
            })),
          );
        }
      })
      .catch(() => {
        if (active) {
          setError(true);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const visiblePeople = getVisiblePeople(people, searchParams);

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
              {!loading && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!loading &&
                !error &&
                people.length > 0 &&
                (visiblePeople.length ? (
                  <PeopleTable people={visiblePeople} />
                ) : (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
