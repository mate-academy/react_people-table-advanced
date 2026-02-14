import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

export const PeopleTable: React.FC<{ people: Person[] }> = ({ people }) => {
  const location = useLocation();
  const { search } = location;
  const [searchParams] = useSearchParams();
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(people);

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const query = (searchParams.get('query') ?? '').trim();
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    const normalizedQuery = query.toLowerCase();

    const filtered = people
      .filter(p => {
        const name = (p.name ?? '').toLowerCase();
        const father = (p.fatherName ?? '').toLowerCase();
        const mother = (p.motherName ?? '').toLowerCase();

        const matchesQuery =
          name.includes(normalizedQuery) ||
          father.includes(normalizedQuery) ||
          mother.includes(normalizedQuery);

        const matchesCentury =
          centuries.length === 0 || centuries.includes(centuryOf(p.born));

        return matchesQuery && matchesCentury;
      })
      .sort((a, b) => {
        if (!sort) return 0;

        if (sort === 'name') return order === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
        if (sort === 'sex') return order === 'desc' ? b.sex.localeCompare(a.sex) : a.sex.localeCompare(b.sex);
        if (sort === 'born') return order === 'desc' ? b.born - a.born : a.born - b.born;
        if (sort === 'died') return order === 'desc' ? (b.died ?? Infinity) - (a.died ?? Infinity) : (a.died ?? -Infinity) - (b.died ?? -Infinity);

        return 0;
      });

    setFilteredPeople(filtered);
  }, [people, query, centuries, sort, order]);

  const getSortParams = (field: string) => {
    const params = new URLSearchParams(location.search);

    if (sort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (!order) {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    return toObject(params);
  };

  const renderHeader = (field: string, label: string) => (
    <th>
      <SearchLink params={getSortParams(field)}>
        <span className="is-flex is-align-items-center">
          {label}
          {sort === field && (
            <span className="icon" aria-label={`Sort by ${field} ${order === 'desc' ? 'descending' : 'ascending'}`}>
              <i className={`fas fa-sort-${order === 'desc' ? 'down' : 'up'}`} />
            </span>
          )}
        </span>
      </SearchLink>
    </th>
  );

  const centuryOf = (year?: number) => {
    if (year == null) return '';
    return String(Math.floor(year / 100));
  };

  return (
    <table className="table is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          {renderHeader('name', 'Name')}
          {renderHeader('sex', 'Sex')}
          {renderHeader('born', 'Born')}
          {renderHeader('died', 'Died')}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.length === 0 ? (
          <tr>
            <td colSpan={6} className="has-text-centered">No people found</td>
          </tr>
        ) : (
          filteredPeople.map(p => (
            <tr key={p.slug}>
              <td><Link to={`/people/${p.slug}${search}`}>{p.name}</Link></td>
              <td>{p.sex}</td>
              <td>{p.born}</td>
              <td>{p.died ?? ''}</td>
              <td>{p.motherName ?? ''}</td>
              <td>{p.fatherName ?? ''}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

const toObject = (params: URLSearchParams): Record<string, string | string[]> => {
  const result: Record<string, string | string[]> = {};
  params.forEach((value, key) => {
    if (!(key in result)) {
      result[key] = value;
    } else {
      const prev = result[key];
      result[key] = Array.isArray(prev) ? [...prev, value] : [prev as string, value];
    }
  });
  return result;
};
