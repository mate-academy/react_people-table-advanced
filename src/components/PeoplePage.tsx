/* eslint-disable max-len */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch (error) {
        setErrorMessage('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading ? (
        <Loader />
      ) : (
        <>
          {errorMessage ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          ) : (
            <>
              {people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <div className="block">
                  <div className="columns is-desktop is-flex-direction-row-reverse">
                    <div className="column is-7-tablet is-narrow-desktop">
                      <PeopleFilters />
                    </div>
                    <div className="column">
                      <div className="box table-container">
                        <PeopleTable people={people} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
