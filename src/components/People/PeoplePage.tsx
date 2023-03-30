import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { getPeople } from '../../api';

import { Person } from '../../types';

import { filterPeople } from '../../utils/filterPeople';
import { sortPeople } from '../../utils/SortPeople';

import PeopleFilters from '../Filters/PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [isHaveNotPeople, setHaveNotPeople] = useState(false);

  const { personSlug = '' } = useParams();
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  useEffect(() => {
    getPeople()
      .then(res => {
        if (!res.length) {
          setHaveNotPeople(true);
        } else {
          setPeople(res);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    return filterPeople(people, sex, query, centuries);
  }, [people, sex, query, centuries]);

  const sortedPeople = useMemo(() => {
    return sortPeople(filteredPeople, sort, order);
  }, [filteredPeople, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              <PeopleTable
                people={people}
                visiblePeople={sortedPeople}
                isLoading={isLoading}
                isError={isError}
                isHaveNotPeople={isHaveNotPeople}
                isNotFoundPeople={!filteredPeople.length}
                personSlug={personSlug}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
