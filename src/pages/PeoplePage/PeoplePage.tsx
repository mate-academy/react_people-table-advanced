import { useEffect, useState } from 'react';

import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getAllPeople = async () => {
      try {
        const allPeople = await getPeople();

        setPeople(allPeople);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getAllPeople();
  }, []);

  const hasPeopleOnServer = people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {hasPeopleOnServer && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading
                ? <Loader />
                : (
                  <>
                    {hasError && (
                      <p data-cy="peopleLoadingError">Something went wrong</p>
                    )}

                    {hasPeopleOnServer && !hasError && (
                      <PeopleTable people={people} />
                    )}

                    {!hasPeopleOnServer && !hasError && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
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
