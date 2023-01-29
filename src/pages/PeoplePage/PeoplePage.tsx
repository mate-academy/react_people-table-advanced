import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { getPreparedPeople } from '../../helpers/getPreparedPeople';
import { getVisiblePeople } from '../../helpers/getVisiblePeople';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleLoadingError, setPeopleLoadingError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const century = searchParams.getAll('century');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const peopleFromServer = async () => {
    setIsLoading(true);

    try {
      const loadPeople = await getPeople();

      const preparedPeople = getPreparedPeople(loadPeople);

      setPeople(preparedPeople);
    } catch {
      setPeopleLoadingError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    peopleFromServer();
  }, []);

  const visiblePeople = useMemo(() => getVisiblePeople(
    people,
    query,
    sex,
    century,
    sort,
    order,
  ), [
    people,
    query,
    sex,
    century,
    sort,
    order,
  ]);

  const shouldPeopleFilterAppear = !isLoading && !peopleLoadingError;
  const noPeopleRecived = people.length === 0 && !isLoading;
  const noSuitablePeople = visiblePeople.length === 0 && !isLoading;
  const shouldPeopleTableAppear = !isLoading && visiblePeople.length !== 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {shouldPeopleFilterAppear && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {peopleLoadingError
                && <p data-cy="peopleLoadingError">Something went wrong</p>}

              {noPeopleRecived && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noSuitablePeople
                && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {shouldPeopleTableAppear
                && (
                  <PeopleTable
                    people={visiblePeople}
                    sort={sort}
                    order={order}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
