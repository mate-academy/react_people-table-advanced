import { useEffect, useState } from 'react';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setHasError(false);

        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch (err) {
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
      {hasError ? (
        <tr>
          <td
            className="has-text-danger"
            data-cy="peopleLoadingError"
          >
            Something went wrong
          </td>
        </tr>
      ) : (
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="block">
              <div className="columns is-desktop is-flex-direction-row-reverse">
                <div className="column is-7-tablet is-narrow-desktop">
                  <PeopleFilters />
                </div>

                <div className="column">
                  <PeopleTable
                    people={people}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
