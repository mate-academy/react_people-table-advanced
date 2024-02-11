import { useEffect, useState } from 'react';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDataFromServer = async () => {
      try {
        setIsLoading(true);

        const peopleFromServer = await getPeople();

        const peopleToRender = peopleFromServer.map(person => {
          return {
            ...person,
            mother: peopleFromServer
              .find(({ name }) => name === person.motherName),
            father: peopleFromServer
              .find(({ name }) => name === person.fatherName),
          };
        });

        setPeople(peopleToRender);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    getDataFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {(!!people?.length && !error) && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {(!!people?.length && !error) && <PeopleTable people={people} />}
              {(!people?.length && !error) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the serverrr
                </p>
              )}
              {(isLoading && <Loader />)}
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
