import * as React from 'react';
import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { getFilters } from '../utils/getFilters';
import { applyFilters, applySorting } from '../utils/applyFilters';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  const filters = getFilters(searchParams);

  let visiblePeople = applyFilters(people, filters);

  visiblePeople = applySorting(visiblePeople, filters);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="columns is-desktop is-flex-direction-row-reverse">
        <div className="column is-7-tablet is-narrow-desktop">
          <PeopleFilters />
        </div>
        <div className="column">
          <PeopleTable people={visiblePeople} />
        </div>
      </div>
    </>
  );
};
