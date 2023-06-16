import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { NoPeopleMessage } from '../components/NoPeopleMessage';
import { useSortAndSearch } from '../hooks/useSortAndSearch';
import { getSearchWith } from '../utils/searchHelper';
import { Gender } from '../types/SortSex';
import { Sort } from '../types/Sort';
import { Error } from '../components/Error';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { personSlug = '' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || Gender.All;
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || Sort.None;
  const order = searchParams.get('order') || '';

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

  const sortedAndSearchedPeople = useSortAndSearch(
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

  const dataFromServer = (sortedAndSearchedPeople.length > 0)
    ? (
      <PeopleTable
        people={sortedAndSearchedPeople}
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
              {isError && <Error />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
