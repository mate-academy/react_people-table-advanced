import React, {
  useCallback,
  useEffect,
  useMemo,
  // useMemo,
  useState,
} from 'react';
// import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { ErrorMassege } from '../types/ErrorMassege';
import { Person } from '../types';
import { Error } from '../types/Error';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState<Error>({
    status: false,
    notification: ErrorMassege.None,
  });
  const [isLoading, setIsLoading] = useState(false);

  const displayFilterBar = useMemo(() => {
    return !isLoading
      && (isError.notification !== ErrorMassege.Empty)
      && (isError.notification !== ErrorMassege.Load);
  }, []);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [searchParams] = useSearchParams();

  // const sex = searchParams.get('sex') || null;

  // const visiblePeople = useMemo(() => {
  //   if (!sex) {
  //     return people;
  //   }

  //   return people.filter(person => person.sex === sex);
  // }, [sex, people]);

  const handleLoadPeople = useCallback(async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      if (peopleFromServer.length === 0) {
        setIsError({ status: true, notification: ErrorMassege.Empty });
      }

      setPeople([...peopleFromServer]);
    } catch {
      setIsError({ status: true, notification: ErrorMassege.Load });
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
                // setIsError={setIsError}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
