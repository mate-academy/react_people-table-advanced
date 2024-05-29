import { useEffect, useMemo, useState } from 'react';
import { PersonType } from '../types';
import { client } from '../utils/fetchPeople';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPreparedPeople } from '../utils/filterPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [getError, setGetError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const visiblePeople = useMemo(() => {
    const options = {
      sex: searchParams.get('sex'),
      query: searchParams.get('query'),
      centuries: searchParams.getAll('centuries'),
      sort: searchParams.get('sort'),
      order: searchParams.get('order'),
    };

    return getPreparedPeople(people, options);
  }, [people, searchParams]);

  useEffect(() => {
    setIsLoading(true);
    const fetchPeople = async () => {
      try {
        const response = await client.get<PersonType[]>('/people.json');

        setPeople(response);
      } catch (error) {
        setGetError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !getError && visiblePeople.length > 0 && (
              <PeopleFilters />
            )}
          </div>
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {getError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!isLoading && !getError && !visiblePeople.length && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}
              {!isLoading && !getError && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
