import { useLayoutEffect, useState } from 'react';

import { PeopleFilters } from '../../components/Filters/PeopleFilters';
import { PeopleList } from '../../components/PeopleList/PeopleList';
import { Person } from '../../types';
import { getNormalizedPeopleList } from '../../helpers/getNormalizedPeopleList';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isNoPeopleOnServer, setIsNoPeopleOnServer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const normalizedPeopleList = getNormalizedPeopleList(peopleList);

  useLayoutEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeopleList(data);

        if (!data.length) {
          setIsNoPeopleOnServer(true);
        }
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!!normalizedPeopleList.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="column">

            <div className="box table-container">
              {isLoading && <Loader />}

              {isNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!normalizedPeopleList.length && (
                <PeopleList
                  people={normalizedPeopleList}
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
