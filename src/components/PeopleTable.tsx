import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

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

  const buildSortParams = (field: string) => {
    const next = getNextSort(field);

    return { ...next };
  };

  return (
    <table
      className="table is-striped is-hoverable is-narrow is-fullwidth"
      data-cy="peopleTable"
    >
      <thead>
        <tr>
          <th>
            <SearchLink params={buildSortParams('name')}>Name</SearchLink>
          </th>
          <th>
            <SearchLink params={buildSortParams('sex')}>Sex</SearchLink>
          </th>
          <th>
            <SearchLink params={buildSortParams('born')}>Born</SearchLink>
          </th>
          <th>
            <SearchLink params={buildSortParams('died')}>Died</SearchLink>
          </th>
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
