import { useFetchData } from '../hooks/useFetchData';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { FilterTypes } from '../enums/FilterTypes';
import { getFilteredList } from '../helpers/getFilteredList';
import { sortList } from '../helpers/sortList';

const API_BASE = 'https://mate-academy.github.io/react_people-table/api/';

export const PeoplePage = () => {
  const {
    isLoading,
    isError,
    data: peopleList,
  } = useFetchData<Person[]>(`${API_BASE}/people.json`);

  const [searchParams] = useSearchParams();
  const activeFilter = searchParams.get('sex') || FilterTypes.All;
  const searchQuery = searchParams.get('searchQuery') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order') || '';

  const filteredPeopleList = getFilteredList({
    peopleList: peopleList || [],
    activeFilter,
    searchQuery,
    centuries,
  });

  const displayedPeople = sortList(filteredPeopleList, sortOrder, sortField);

  const loading = isLoading && <Loader />;
  const error = isError && (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      Something went wrong
    </p>
  );
  const isEmptyList = !(loading || isError || peopleList?.length) && (
    <p data-cy="noPeopleMessage">There are no people on the server</p>
  );

  const content = !(
    isLoading ||
    isError ||
    !peopleList?.length ||
    isEmptyList
  ) && <PeopleTable peopleList={displayedPeople} />;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!(isLoading || isError || !peopleList?.length) && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading}
              {error}
              {isEmptyList}
              {content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
