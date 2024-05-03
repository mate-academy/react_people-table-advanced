import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable';
import { useParams, useSearchParams } from 'react-router-dom';
import { LoadingError } from '../../components/LoadingError';
import { PeopleFilters } from '../../components/PeopleFilters';
import { Orders, SortKeys } from '../../types/sortTypes';
import { NoPeopleMessage } from '../../components/NoPeopleMessage';
import { NoVisiblePeople } from '../../components/NoVisiblePeople';
import { getFilteredPeople } from '../../utils/getFilteredPeople';
import { getSortedPeople } from '../../utils/getSortedPeople';

export const PeoplePage = () => {
  const { selectedSlug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [searchParams] = useSearchParams();

  const currentQuery = searchParams.get('query') || '';
  const currentSexFilter = searchParams.get('sex') || '';
  const currentCenturies = searchParams.getAll('centuries');
  const currentOrder = searchParams.get('order') || Orders.Ascending;
  const currentSort = searchParams.get('sort') || SortKeys.None;

  const filteredPeople = getFilteredPeople(people, {
    query: currentQuery,
    sex: currentSexFilter,
    centuries: currentCenturies,
  });

  const preparedPeople = getSortedPeople(filteredPeople, {
    order: currentOrder,
    sort: currentSort,
  });

  const isLoadingSuccessful = !isLoading && !isFailed;
  const isNoPeopleMessageShown = !people.length && isLoadingSuccessful;
  const isNoVisiblePeopleMessageShown =
    !!people.length && isLoadingSuccessful && !preparedPeople.length;
  const isPeopleTableShown = isLoadingSuccessful && !!preparedPeople.length;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(response => {
        setPeople(response);
      })
      .catch(() => {
        setIsFailed(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isLoadingSuccessful && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {isFailed && <LoadingError />}
              {isNoPeopleMessageShown && <NoPeopleMessage />}
              {isNoVisiblePeopleMessageShown && <NoVisiblePeople />}
              {isPeopleTableShown && (
                <PeopleTable
                  selectedSlug={selectedSlug}
                  people={preparedPeople}
                  peopleFromServer={people}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
