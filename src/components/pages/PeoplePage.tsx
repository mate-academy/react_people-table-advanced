import {
  useEffect,
  useState,
  memo,
  useMemo,
} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

import { Person } from '../../types';
import { getPeople } from '../../api';
import { getFilteredPeople } from '../../utils/getFilteredPeople';

export const PeoplePage: React.FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const { slug = '' } = useParams();

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const visiblePeople = useMemo(() => (
    getFilteredPeople(
      sex, centuries, query, people, sort, order,
    )
  ), [sex, centuries, query, people, sort, order]);

  const hasPeople = !isLoading && people.length;
  const noPeople = !isLoading && !people.length;
  const noFilteredPeople = !isLoading && !visiblePeople.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {hasPeople && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {noPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noFilteredPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {hasPeople && !noFilteredPeople && (
                <PeopleTable
                  people={visiblePeople}
                  selectedSlug={slug}
                  sort={sort}
                  isReversed={order === 'desc'}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
