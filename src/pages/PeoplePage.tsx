/* eslint-disable @typescript-eslint/indent */
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { useFilteredPeople } from '../hooks/useFilteredPeople';
import { useSortedPeople } from '../hooks/useSortedPeople';
import { ErrorNotification } from '../utils/errorNotification';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  // const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeopleList)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useFilteredPeople(peopleList);
  const peopleToShow = useSortedPeople(filteredPeople);

  // const peopleToShow = useMemo(() => {
  //   return peopleList.filter(
  //     person =>
  //       searchParams.get('sex') === null ||
  //       searchParams.get('sex') === person.sex,
  //   );
  // }, [searchParams, peopleList]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {peopleList.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError">
                  {ErrorNotification.loadingError}
                </p>
              )}

              {!isLoading && !hasError && peopleList.length === 0 && (
                <p data-cy="noPeopleMessage">{ErrorNotification.noPeople}</p>
              )}

              {!isLoading &&
                !hasError &&
                peopleList.length > 0 &&
                peopleToShow.length === 0 && (
                  <p>{ErrorNotification.noMatches}</p>
                )}

              {!isLoading && !hasError && peopleToShow.length > 0 && (
                <PeopleTable people={peopleToShow} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
