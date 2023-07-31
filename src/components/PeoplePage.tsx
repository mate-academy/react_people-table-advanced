import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const arrUsers = await getPeople();

      if (!arrUsers.length) {
        setIsLoading(false);

        return;
      }

      setPeople(arrUsers);
      setIsDataFetched(true);
      setIsLoading(false);
    } catch {
      setError('Something went wrong');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const preparedPeopleWithParents = people.map((person) => ({
    ...person,
    mother: people.find((p) => p.name === (person.motherName || '-')),
    father: people.find((p) => p.name === (person.fatherName || '-')),
  }));

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
              {isLoading && <Loader />}
              {!isLoading && !isDataFetched
                && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    {error}
                  </p>
                )}

              <p>There are no people matching the current search criteria</p>

              {!people.length && isDataFetched
                ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  !isLoading && isDataFetched
                    && (
                      <PeopleTable
                        people={preparedPeopleWithParents}
                      />
                    )
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
