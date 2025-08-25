import { useEffect, useState } from 'react';
import { BlockOfPeople } from '../blockOfPeople';
import { Loader } from '../Loader';
import { PeopleFilters } from '../peopelefilter';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const userQuery = searchParams.get('search') || '';
  const sexQuery = searchParams.get('sex') || '';
  const agePeople = searchParams.getAll('centuries') || [];

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => setPeople(data))
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">People Page</h1>

          {isLoading ? (
            <div className="block">
              <Loader />
            </div>
          ) : (
            <div className="block">
              <div className="columns is-desktop is-flex-direction-row-reverse">
                <div className="column is-7-tablet is-narrow-desktop">
                  <PeopleFilters
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    agePeople={agePeople}
                  />
                </div>

                <BlockOfPeople
                  isLoading={isLoading}
                  people={people}
                  isError={isError}
                  userQuery={userQuery}
                  sexQuery={sexQuery}
                  agePeople={agePeople}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
