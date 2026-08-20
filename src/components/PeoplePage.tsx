import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [noServerPeople, setNoServerPeople] = useState(false);
  const [loading, setLoading] = useState(true);
  const { name } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(false);
    setNoServerPeople(false);

    getPeople()
      .then((data: Person[]) => {
        if (data.length === 0) {
          setNoServerPeople(true);
        }

        setPeople(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const noMatchingPeople =
    !loading &&
    !error &&
    people.length > 0 &&
    name !== undefined &&
    !people.some(person => person.slug === name);

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

              {!loading && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !error && noServerPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && noMatchingPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !error && people.length > 0 && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
