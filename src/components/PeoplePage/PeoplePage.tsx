import { useState, useEffect } from 'react';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../../api';
import { getFullInfo } from '../../helpers/getFullInfo';
import { Person } from '../../types';
import { ErrorAPI } from '../ErrorAPI/ErrorAPI';

export const PeoplePage = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoadingData(true);

    getPeople()
      .then(peopleFromServer => {
        const fullInfoPeople = getFullInfo(peopleFromServer);

        setPeople(fullInfoPeople);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoadingData(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoadingData && <PeopleFilters />}
          </div>

          <div className="column">
            {hasError ? (
              <ErrorAPI />
            ) : (
              <div className="box table-container">
                {
                  isLoadingData
                    ? <Loader />
                    : <PeopleTable people={people} />
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
