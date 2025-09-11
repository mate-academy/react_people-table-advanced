import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

interface Props {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const [searchParams] = useSearchParams();

  const getNextSort = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order') || 'asc';

    if (currentSort !== field) {
      return { sort: field, order: 'asc' };
    }

    if (currentOrder === 'asc') {
      return { sort: field, order: 'desc' };
    }

    return {};
  };

  const buildSortLink = (field: string) => {
    const newParams = new URLSearchParams(searchParams);
    const next = getNextSort(field);

    newParams.delete('sort');
    newParams.delete('order');

    if (next.sort) {
      newParams.set('sort', next.sort);
    }

    if (next.order) {
      newParams.set('order', next.order);
    }

    return `/people?${newParams.toString()}`;
  };

  return (
    <table
      className="table is-striped is-hoverable is-narrow is-fullwidth"
      data-cy="peopleTable"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th key={field}>
              <SearchLink to={buildSortLink(field)}>
                {field[0].toUpperCase() + field.slice(1)}
              </SearchLink>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(p => (
          <tr
            key={p.slug}
            data-cy="person"
            className={p.slug === selectedSlug ? 'has-background-warning' : ''}
          >
            <td>
              <SearchLink
                to={`/people/${p.slug}`}
                className={p.sex === 'f' ? 'has-text-danger' : ''}
              >
                {p.name}
              </SearchLink>
            </td>
            <td>{p.sex}</td>
            <td>{p.born}</td>
            <td>{p.died}</td>
            <td>
              {p.mother ? (
                <SearchLink
                  to={`/people/${p.mother.slug}`}
                  className="has-text-danger"
                >
                  {p.mother.name}
                </SearchLink>
              ) : (
                p.motherName || '-'
              )}
            </td>
            <td>
              {p.father ? (
                <SearchLink to={`/people/${p.father.slug}`}>
                  {p.father.name}
                </SearchLink>
              ) : (
                p.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
