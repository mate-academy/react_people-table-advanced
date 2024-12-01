import {
  FC,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters/PeopleFilters';
import { getVisiblePeople } from '../components/helpers/getVisiblePeople';
import { FilterType } from '../types/FilterType';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get(FilterType.SEX) || null;
  const query = searchParams.get(FilterType.QUERY) || '';
  const centuries = searchParams.getAll(FilterType.CENTURIES) || [];
  const order = searchParams.get(FilterType.ORDER) || null;
  const sort = searchParams.get(FilterType.SORT) || null;

  const visiblePeople: Person[] = useMemo(() => (
    getVisiblePeople(
      people,
      sex,
      query,
      centuries,
      sort,
      order,
    )
  ), [people, sex, query, centuries, order, sort]);

  const loadPeople = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const peopleResponse = await getPeople();

      setPeople(peopleResponse);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !isError && (
              <PeopleFilters sex={sex} query={query} centuries={centuries} />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isError && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  Something went wrong
                </p>
              )}

              {!people.length && !isError && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!visiblePeople.length && people.length > 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {visiblePeople.length > 0 && !isLoading && (
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
