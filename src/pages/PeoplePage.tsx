import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import FetchError from '../errors/FetchError';
import NoPeopleMessage from '../errors/NoPeopleMessage';
import PeopleTable from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { getPreparedPeople } from '../utils/getPreparedPeople';
import NoMatchingPeople from '../errors/NoMatchingPeople';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || '';

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        setPeople(peopleFromServer);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visiblePeople = useMemo(
    () => getPreparedPeople(people, { query, sex, centuries }),
    [people, query, sex, centuries],
  );

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
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {isError && <FetchError />}
                  {!isLoading && people.length === 0 && <NoPeopleMessage />}
                  {!isLoading && visiblePeople.length === 0 && (
                    <NoMatchingPeople />
                  )}
                  {visiblePeople.length !== 0 && people.length !== 0 && (
                    <PeopleTable people={visiblePeople} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
