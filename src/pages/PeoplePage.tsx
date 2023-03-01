import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { sortPeople } from '../utils/helpers';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const loadPeople = async () => {
    setIsLoading(true);
    setIsInitialized(false);
    setIsError(false);
    try {
      const serverResp = await getPeople();
      const onlyWithParents = serverResp.map((person) => {
        const mother = serverResp.find(m => m.name === person.motherName);
        const father = serverResp.find(f => f.name === person.fatherName);

        return (
          {
            ...person,
            mother,
            father,
          }
        );
      });

      setPeople(onlyWithParents);
      setIsInitialized(true);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const isNoPeopleOnServer = isInitialized && !people.length;
  const sortedPeople = useMemo(
    () => sortPeople(people, sort, order), [people, sort, order],
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
