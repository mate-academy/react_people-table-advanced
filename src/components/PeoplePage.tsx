import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { FilterForPeople } from './FilterForPeople';
import { SortForPeople } from './SortForPeople';

export const PeoplePage: React. FC = () => {
  const { slug = '' } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sortByField = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  const filteredPeople = useMemo(() => {
    return FilterForPeople(people, sex, query, centuries);
  }, [people, sex, query, centuries]);

  const sortedPeople = useMemo(() => {
    return SortForPeople(filteredPeople, sortByField, isReversed);
  }, [filteredPeople, sortByField, isReversed]);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setIsLoading(true);
        const loadedPeople = await getPeople();

        setPeople(loadedPeople);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && !isError
            && <PeopleFilters query={query} sex={sex} centuries={centuries} />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (<Loader />)}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && !isLoading && !isError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && (
                <PeopleTable
                  sortedPeople={sortedPeople}
                  slug={slug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
