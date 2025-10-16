import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import sortAsc from '../public/sort_asc.png';
import sortDesc from '../public/sort_desc.png';
import sortBoth from '../public/sort_both.png';

interface Props {
  people: Person[];
  selectedPersonSlug?: string;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
}) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const getNextSort = (field: string) => {
    if (sortField !== field) {
      return { sort: field, order: null };
    }

    if (!sortOrder) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return sortBoth;
    }

    if (!sortOrder) {
      return sortAsc;
    }

    if (sortOrder === 'desc') {
      return sortDesc;
    }
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <SearchLink to="/people" params={getNextSort(field)}>
                  <img
                    src={getSortIcon(field)}
                    alt="sort"
                    style={{ width: '16px', marginLeft: 4 }}
                  />
                </SearchLink>
              </span>
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
            className={
              p.slug === selectedPersonSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <SearchLink to={`/people/${p.slug}`} params={{}}>
                <span className={p.sex === 'f' ? 'has-text-danger' : ''}>
                  {p.name}
                </span>
              </SearchLink>
            </td>
            <td>{p.sex}</td>
            <td>{p.born}</td>
            <td>{p.died}</td>
            <td>
              {p.mother ? (
                <SearchLink to={`/people/${p.mother.slug}`} params={{}}>
                  <span className="has-text-danger">{p.mother.name}</span>
                </SearchLink>
              ) : (
                '-'
              )}
            </td>
            <td>
              {p.father ? (
                <SearchLink to={`/people/${p.father.slug}`} params={{}}>
                  {p.father.name}
                </SearchLink>
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
