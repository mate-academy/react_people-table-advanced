import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setLoading(true);
    setError(false);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    let result = [...people];

    if (query) {
      const q = query.toLowerCase();

      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.motherName?.toLowerCase().includes(q) ||
          p.fatherName?.toLowerCase().includes(q),
      );
    }

    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    if (centuries.length > 0) {
      result = result.filter(p =>
        centuries.includes(Math.ceil(p.born / 100).toString()),
      );
    }

    if (sort) {
      result.sort((a, b) => {
        let cmp = 0;

        switch (sort) {
          case 'name':
            cmp = a.name.localeCompare(b.name);
            break;
          case 'sex':
            cmp = a.sex.localeCompare(b.sex);
            break;
          case 'born':
            cmp = a.born - b.born;
            break;
          case 'died':
            cmp = a.died - b.died;
            break;
        }

        return order === 'desc' ? -cmp : cmp;
      });
    }

    return result;
  }, [people, query, sex, centuries, sort, order]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="has-text-danger">Something went wrong</p>;
  }

  if (people.length === 0) {
    return <p>No people on the server</p>;
  }

  return (
    <div className="columns">
      <div className="column is-one-quarter">
        <PeopleFilters />
      </div>
      <div className="column">
        <PeopleTable people={filteredPeople} selectedSlug={slug} />
      </div>
    </div>
  );
};
