import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isPageLoading, setIsPageLoading] = useState(false);

  const { userUrl = '' } = useParams();

  useEffect(() => {
    const peopleGetter = async () => {
      try {
        const peoples = await getPeople();

        setPeople(peoples);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
        setIsPageLoading(true);
      }
    };

    setIsLoading(true);

    peopleGetter();
  }, []);

  return (
    <div className="block">
      <div className="columns is-desktop is-flex-direction-row-reverse">
        <div className="column is-7-tablet is-narrow-desktop">
          <PeopleFilters />
        </div>

        <div className="column">
          <div className="box table-container">
            {isError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {(!people.length && isPageLoading) && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

            {isLoading ? <Loader /> : (
              isPageLoading
                && <PeopleTable people={people} selectedUser={userUrl} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
