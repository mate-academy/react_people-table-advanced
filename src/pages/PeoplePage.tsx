import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { ErrorMessage } from '../types/ErrorMessage';
import { Person } from '../types';
import { Error } from '../types/Error';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState<Error>({
    status: false,
    notification: ErrorMessage.None,
  });
  const [isLoading, setIsLoading] = useState(false);

  const displayFilterBar = useMemo(() => {
    return !isLoading
      && isError.notification !== ErrorMessage.Empty
      && isError.notification !== ErrorMessage.Load;
  }, [isLoading, isError]);

  const handleLoadPeople = useCallback(async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      if (peopleFromServer.length === 0) {
        setIsError({ status: true, notification: ErrorMessage.Empty });
      }

      setPeople([...peopleFromServer]);
    } catch {
      setIsError({ status: true, notification: ErrorMessage.Load });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleLoadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {(displayFilterBar) && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              <PeopleTable
                people={people}
                isLoading={isLoading}
                isError={isError}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
