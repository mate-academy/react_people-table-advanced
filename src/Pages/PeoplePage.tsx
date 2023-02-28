import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { prepareDataFromServer } from '../utils/prepereDataFromServer';
import { PeopleFilters } from '../components/PeopleFilter';
import { getFilteredPeople } from '../utils/getFilteredPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const visiblePeople = getFilteredPeople([...people], query, sex, centuries);

  const getPeopleFromServer = useCallback(async () => {
    try {
      setIsPeopleLoading(true);

      const peopleFromServer = await getPeople();

      setPeople(prepareDataFromServer(peopleFromServer));
      setIsPeopleLoading(false);
    } catch (error) {
      setIsError(true);
      setIsPeopleLoading(false);
    }
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isPeopleLoading
              && (
                <PeopleFilters />
              )}
          </div>
          <div className="column">
            <div className="box table-container">
              {isPeopleLoading
                ? <Loader />
                : (
                  <>
                    <p
                      data-cy="peopleLoadingError"
                      className={cn('has-text-danger', {
                        'is-hidden': !isError,
                      })}
                    >
                      Something went wrong
                    </p>

                    <p
                      data-cy="noPeopleMessage"
                      className={cn({
                        'is-hidden': !!people.length,
                      })}
                    >
                      There are no people on the server
                    </p>

                    {!!people.length
                      && (
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
