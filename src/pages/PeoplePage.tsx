import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { NoPeopleMessage } from '../components/NoPeopleMessage';
import { PeopleTable } from '../components/PeopleTable';

import { useSort } from '../hooks/useSort';
import { getSearchWith } from '../utils/searchHelper';
import { getPeople } from '../api';

import { Gender } from '../types/SortSex';
import { Sort } from '../types/Sort';
import { Person } from '../types/Person';

enum SearchParams {
  Centuries = 'centuries',
  Sex = 'sex',
  Query = 'query',
  SortParam = 'sort',
  Order = 'order',
}

const DefaultSearchParams = {
  [SearchParams.Centuries]: [],
  [SearchParams.Sex]: Gender.All,
  [SearchParams.Query]: '',
  [SearchParams.SortParam]: Sort.None,
  [SearchParams.Order]: '',
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { personSlug = '' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams
    .getAll(SearchParams.Centuries)
    || DefaultSearchParams[SearchParams.Centuries];
  const sex = searchParams
    .get(SearchParams.Sex) || DefaultSearchParams[SearchParams.Sex];
  const query = searchParams
    .get(SearchParams.Query) || DefaultSearchParams[SearchParams.Query];
  const sort = searchParams
    .get(SearchParams.SortParam) || DefaultSearchParams[SearchParams.SortParam];
  const order = searchParams
    .get(SearchParams.Order) || DefaultSearchParams[SearchParams.Order];

  async function fetchPeople() {
    setIsError(false);
    try {
      setIsLoading(true);
      const peopleData = await getPeople();

      setPeople(peopleData);
      setIsLoading(false);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPeople();
  }, []);

  const sortedPeople = useSort(
    people,
    sex,
    centuries,
    query,
    sort,
    order,
  );

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  const dataFromServer = (sortedPeople.length > 0)
    ? (
      <PeopleTable
        people={sortedPeople}
        selectedSlug={personSlug}
        sort={sort}
        order={order}
      />
    )
    : <NoPeopleMessage />;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">

          {people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                centuries={centuries}
                query={query}
                onQueryChange={onQueryChange}
                sex={sex as Gender}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading
                ? <Loader />
                : dataFromServer}
              {isError && <ErrorMessage />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
