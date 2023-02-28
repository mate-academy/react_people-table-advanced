import {
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { PeopleFilters } from '../../components/PeopleFilter';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeopleWithParents } from '../../utils/getPeopleWithParents';
import { getFilteredPeople } from '../../utils/getFilteredPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { personSlug = '' } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const filterQuery = searchParams.get('query') || '';
  const sortParam = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';
  const centuries = searchParams.getAll('centuries') || [];

  const fetchPeople = useCallback(
    async () => {
      try {
        setIsLoading(true);

        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [people],
  );

  useEffect(() => {
    fetchPeople();
  }, []);

  const peopleWithParents = useMemo(
    () => getPeopleWithParents(people), [people],
  );

  const visiblePeople = useMemo(
    () => getFilteredPeople(
      sex,
      filterQuery,
      sortParam,
      isReversed,
      peopleWithParents,
      centuries,
    ),
    [searchParams, isLoading],
  );

  const isWrong = !isLoading && !isError && people.length === 0;
  const isLoaded = !isLoading && visiblePeople.length > 0;
  const isNoResult = !isLoading && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              sex={sex}
              query={filterQuery}
              setSearchParams={setSearchParams}
              searchParams={searchParams}
              centuries={centuries}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isWrong && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNoResult && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isLoaded && (
                <PeopleTable
                  people={visiblePeople}
                  personSlug={personSlug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
