import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader, PeopleFilter, PeopleTable } from '../components';

export const PeoplePage = () => {
  const { person: selectedPersonSlug = '' } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isTableVisible = !hasError && !!people.length;
  const hasNoPeople = !hasError && !people.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && <PeopleFilter />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading
                ? <Loader />
                : (
                  <>
                    {hasError && (
                      <div className="notification is-danger">
                        <p data-cy="peopleLoadingError">
                          Something went wrong
                        </p>
                      </div>
                    )}

                    {isTableVisible && (
                      <PeopleTable
                        people={people}
                        selectedPersonSlug={selectedPersonSlug}
                      />
                    )}

                    {hasNoPeople && (
                      <div className="notification is-warning">
                        <p data-cy="noPeopleMessage">
                          There are no people on the server
                        </p>
                      </div>
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
