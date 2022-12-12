import React, {
  useEffect,
  useState,
  useMemo,
} from 'react';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { PeopleFilters } from '../components/PeopleFilters';
import { Error } from '../types/Error';
import { ErrorNotification } from '../types/ErrorNotification';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<Error>({
    status: false,
    notification: ErrorNotification.None,
  });

  const displayFilterBar = useMemo(() => {
    return !isLoading
      && isError.notification !== ErrorNotification.Empty
      && isError.notification !== ErrorNotification.Load;
  }, [isLoading, isError]);

  const loadPeopleFromServer = async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      if (peopleFromServer.length === 0) {
        setIsError({ status: true, notification: ErrorNotification.Empty });
      }

      setPeople(peopleFromServer);
    } catch (error) {
      setIsError({ status: true, notification: ErrorNotification.Load });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {displayFilterBar && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              <PeopleTable
                people={people}
                isError={isError}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
