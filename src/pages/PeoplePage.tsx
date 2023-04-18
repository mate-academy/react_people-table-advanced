import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { PeopleFilters } from '../components/PeopleFilters';
import { filterPeople, getParent, sortPeople } from '../utils/helpers';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasError] = useState(false);
  const [hasDataError, setHasDataError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const loadPeople = async () => {
    try {
      const loadedPeople = await getPeople();

      if (!loadedPeople.length) {
        setHasDataError(true);
      }

      const peopleWithParents = loadedPeople.map(person => ({
        ...person,
        mother: getParent(loadedPeople, person.motherName),
        father: getParent(loadedPeople, person.fatherName),
      }));

      setPeople(peopleWithParents);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const visiblePeople = useMemo(() => {
    const filteredPeople = filterPeople(people, sex, query, centuries);
    const sortedPeople = sortPeople(filteredPeople, sort, order);

    return sortedPeople;
  }, [people, sex, query, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters
                sex={sex}
                query={query}
                centuries={centuries}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading
                ? <Loader />
                : (
                  <>
                    {hasLoadingError && (
                      <p data-cy="peopleLoadingError">Something went wrong</p>
                    )}

                    {hasDataError && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}

                    {visiblePeople.length <= 0 && (
                      <p>
                        There are no people matching the current search criteria
                      </p>
                    )}

                    {!hasLoadingError && visiblePeople.length > 0 && (
                      <PeopleTable
                        people={visiblePeople}
                        sort={sort}
                        order={order}
                      />
                    )}
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
