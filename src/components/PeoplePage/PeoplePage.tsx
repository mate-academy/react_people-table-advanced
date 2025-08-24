import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import NoPeopleOnServerError from '../NoPeopleOnServerError';
import SomethingWrongError from '../SomethingWrongError';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../PeopleFilters';
import { useFiltAndSortPeople } from '../../hooks/useFiltAndSortPeople';
import { usePeopleData } from '../../hooks/usePeopleData';
import { useSort } from '../../hooks/useSort';

export const PeoplePage = () => {
  const { peoples, isLoading, hasError, isFirstLoad } = usePeopleData();
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams<{ slug: string }>();

  const visiblePeople = useFiltAndSortPeople(peoples, searchParams);
  const handleSort = useSort();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>
          )}
          <div className="box table-container">
            {isLoading && <Loader />}
            {!isLoading && hasError && <SomethingWrongError />}
            {!isLoading &&
              !hasError &&
              peoples.length === 0 &&
              !isFirstLoad && <NoPeopleOnServerError />}
            {!isLoading && !hasError && peoples.length > 0 && (
              <PeopleTable
                peoples={visiblePeople}
                selectedPersonSlug={slug}
                onSort={handleSort}
                searchParams={searchParams}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
