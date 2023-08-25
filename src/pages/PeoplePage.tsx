import {
  FC, useState, useEffect, useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';
import {
  Person, NotificationType, PersonSex, SortField,
} from '../types';
import { getPeople } from '../api';
import { getVisiblePeople } from '../utils/getVisiblePeople';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { Notification } from '../components/Notification';
import { getPreparePeople } from '../utils/getPreparedPeople';

export const PeoplePage: FC = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sex = searchParams.get('sex') as PersonSex;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const visiblePeople = useMemo(() => {
    const filterOptions = {
      sex,
      query,
      centuries,
    };

    const sortOptions = {
      field: sort as SortField,
      isReversed: !!order,
    };

    return getVisiblePeople(people, { filterOptions, sortOptions });
  }, [people, searchParams]);

  useEffect(() => {
    setIsError(false);

    getPeople()
      .then((peopleData) => {
        const preparedPeople = getPreparePeople(peopleData);

        setPeople(preparedPeople);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleLoaded = !isLoading && !isError;
  const peopleListIsEmpty = peopleLoaded && people.length === 0;
  const peopleNotFound = peopleLoaded && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isError && (
                <Notification type={NotificationType.LoadingError} />
              )}

              {peopleListIsEmpty && (
                <Notification type={NotificationType.NoPeoppleOnServer} />
              )}

              {peopleNotFound && (
                <Notification type={NotificationType.NoPeopleByCriteria} />
              )}

              {(peopleLoaded && visiblePeople.length > 0) && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
