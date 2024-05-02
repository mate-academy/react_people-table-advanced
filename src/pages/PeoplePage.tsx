import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { Errors } from '../types/Errors';
import { getPreparedPeople } from '../utils/getPreparedPeople';
import { PeopleFilters } from '../components/PeopleFilters';
import { getFilteredPeople } from '../utils/getFilteredPeople';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<Errors>(Errors.Default);

  useEffect(() => {
    setError(Errors.Default);

    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
        if (!peopleFromServer.length) {
          setError(Errors.Empty);
        }
      })
      .catch(() => setError(Errors.Loading));
  }, []);

  const preparedPeople = getPreparedPeople(people);
  const visiblePeople = getFilteredPeople(preparedPeople, searchParams);

  const isNoMatchingPeople = !!preparedPeople.length && !visiblePeople.length;
  const isLoading = !error && !people.length;
  const isPeopleTableVisible = !isNoMatchingPeople && !!people.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isPeopleTableVisible && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {error === Errors.Loading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {error === Errors.Empty && (
                <p data-cy="noPeopleMessage">{error}</p>
              )}

              {isNoMatchingPeople && <p>{Errors.Matching}</p>}

              {isLoading && <Loader />}

              {isPeopleTableVisible && <PeopleTable people={visiblePeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
