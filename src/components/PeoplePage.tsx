import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { SortField } from '../types/sortField';
import { Person } from '../types/Person';
import { findParentByType, filterAndSortPeople } from '../utils/peopleUtils';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sortField = searchParams.get('sort') as SortField || SortField.All;
  const sortOrder = searchParams.get('order') || '';

  const preparePeople = async () => {
    setIsPending(true);
    try {
      const result = await getPeople();
      const prepared = result.map(person => ({
        ...person,
        father: findParentByType(result, person, 'father'),
        mother: findParentByType(result, person, 'mother'),
      }));

      setPeople(prepared);
    } catch {
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  const visiblePeople = useMemo(() => filterAndSortPeople(people, {
    sex,
    query,
    centuries,
    sortField,
    sortOrder,
  }), [people, query, centuries, sortField, sortOrder]);

  useEffect(() => {
    preparePeople();
  }, []);

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return (
      <p
        data-cy="peopleLoadingError"
        className="has-text-danger"
      >
        Something went wrong
      </p>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
          <div className="column">
            <div className="box table-container">
              <PeopleTable
                people={visiblePeople}
                onError={isError}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
