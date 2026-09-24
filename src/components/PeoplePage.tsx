import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types/Person';

import { CenturyFilter } from './CenturyFilter';
import { Loader } from './Loader';
import { NameFilter } from './NameFilter';
import { PeopleTable } from './PeopleTable';

const PeoplePage: React.FC = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      ) : people.length === 0 ? (
        <p data-cy="noPeopleMessage">Немає людей</p>
      ) : (
        <div className="columns">
          <aside className="column is-3">
            <NameFilter />
            <CenturyFilter people={people} />
          </aside>

          <div className="column">
            <PeopleTable people={people} selectedSlug={slug} />
          </div>
        </div>
      )}
    </>
  );
};

export default PeoplePage;
