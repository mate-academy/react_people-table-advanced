import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';

function findParent(data: Person[], name: string | null): Person | undefined {
  if (!name) {
    return undefined;
  }

  return data.find(person => person.name === name);
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { slug } = useParams();

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || 'all';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = useMemo(() => {
    let result = [...people];

    if (sex !== 'all') {
      result = result.filter(p => p.sex === sex);
    }

    if (query) {
      const q = query.toLowerCase();

      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.motherName?.toLowerCase().includes(q) ||
          p.fatherName?.toLowerCase().includes(q),
      );
    }

    if (centuries.length) {
      result = result.filter(p => {
        const century = Math.ceil(p.born / 100);

        return centuries.includes(String(century));
      });
    }

    if (sort) {
      result.sort((x, y) => {
        let comparison = 0;

        switch (sort) {
          case 'name':
            comparison = x.name.localeCompare(y.name);
            break;

          case 'sex':
            comparison = x.sex.localeCompare(y.sex);
            break;

          case 'born':
            comparison = x.born - y.born;
            break;

          case 'died':
            comparison = x.died - y.died;
            break;
        }

        return order === 'desc' ? -comparison : comparison;
      });
    }

    return result;
  }, [people, sex, query, centuries, sort, order]);

  useEffect(() => {
    getPeople()
      .then(res => {
        const aggregatePeople = res.map(person => {
          return {
            ...person,
            mother: findParent(res, person.motherName),
            father: findParent(res, person.fatherName),
          };
        });

        setPeople(aggregatePeople);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}

      {!loading && (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {error && <p data-cy="peopleLoadingError">{error}</p>}

                {!loading && <PeopleTable people={visiblePeople} slug={slug} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
