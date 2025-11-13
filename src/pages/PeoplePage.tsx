import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

import { applyFilters } from '../utils/filterHelper';
import { applySort } from '../utils/sortHelper';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { slug: selectedSlug } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex') || '';

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(loadedPeople => {
        setPeople(loadedPeople);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visiblePeople = useMemo(() => {
    if (people.length === 0) {
      return [];
    }

    const filtered = applyFilters(people, query, centuries, sex);

    return applySort(filtered, sort, order);
  }, [people, query, centuries, sex, sort, order]);

  const hasPeople = people.length > 0;
  const hasVisiblePeople = visiblePeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {hasPeople && !isLoading && !hasError && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !hasError && !hasPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !hasError && hasPeople && !hasVisiblePeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !hasError && hasVisiblePeople && (
                <PeopleTable
                  people={visiblePeople}
                  selectedSlug={selectedSlug}
                  currentSort={sort}
                  currentOrder={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
