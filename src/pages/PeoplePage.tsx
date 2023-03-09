import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

import { Person } from '../types';
import { getPeople } from '../api';
import { warningTimer } from '../utils/warningTimer';
import { getVisiblePeople } from '../utils/getVisiblePeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoadingPerson, setIsLoadingPerson] = useState(false);
  const [isHasError, setIsHasError] = useState(false);
  const [searchParams] = useSearchParams();
  const { slug = '' } = useParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const visiblePeople = useMemo(() => {
    return getVisiblePeople(people, sex, query, centuries, sort, order);
  }, [sex, query, centuries, sort, order]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoadingPerson(true);
        const todosData = await getPeople();

        setPeople(todosData);
      } catch (error) {
        setIsHasError(true);
        warningTimer(setIsHasError, false, 3000);
      } finally {
        setIsLoadingPerson(false);
      }
    })();
  }, [isHasError]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoadingPerson && people.length ? (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          ) : null}

          <div className="column">
            <div className="box table-container">
              {isLoadingPerson && <Loader />}

              {isHasError && !isLoadingPerson && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {!isLoadingPerson && !people.length && !isHasError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && !visiblePeople.length && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {!isLoadingPerson && !!visiblePeople.length && (
                <PeopleTable
                  people={visiblePeople}
                  selectedPersonSlug={slug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
