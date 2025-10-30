import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  people: Person[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
  resolveRelative: (name: string) => Person | null;

  onSort: (field: 'name' | 'sex' | 'born' | 'died') => void;
  sort: string | null;
  order: string | null;
};

const sortIcon = (
  field: 'name' | 'sex' | 'born' | 'died',
  sort: string | null,
  order: string | null,
) => {
  if (sort !== field) {
    return 'fas fa-sort';
  }

  return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({
  people,
  selectedSlug,
  onSelect,
  resolveRelative,
  onSort,
  sort,
  order,
}: Props) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => onSort('name')} style={{ cursor: 'pointer' }}>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <span className="icon">
                <i className={sortIcon('name', sort, order)} />
              </span>
            </span>
          </th>

          <th onClick={() => onSort('sex')} style={{ cursor: 'pointer' }}>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <span className="icon">
                <i className={sortIcon('sex', sort, order)} />
              </span>
            </span>
          </th>

          <th onClick={() => onSort('born')} style={{ cursor: 'pointer' }}>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <span className="icon">
                <i className={sortIcon('born', sort, order)} />
              </span>
            </span>
          </th>

          <th onClick={() => onSort('died')} style={{ cursor: 'pointer' }}>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <span className="icon">
                <i className={sortIcon('died', sort, order)} />
              </span>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      {people.map(p => {
        const mother = resolveRelative(p.motherName || '');
        const father = resolveRelative(p.fatherName || '');

        return (
          // eslint-disable-next-line react/jsx-key
          <tbody>
            <tr
              key={p.slug}
              data-cy="person"
              className={
                p.slug === selectedSlug ? 'has-background-warning' : ''
              }
              onClick={() => onSelect(p.slug)}
              style={{ cursor: 'pointer' }}
            >
              <td>
                <Link
                  className={p.sex === 'f' ? 'has-text-danger' : ''}
                  to={`/people/${p.slug}`}
                >
                  {p.name}
                </Link>
              </td>
              <td>{p.sex}</td>
              <td>{p.born}</td>
              <td>{p.died}</td>
              <td>
                {mother ? (
                  <Link
                    className="has-text-danger"
                    to={`/people/${mother.slug}`}
                    onClick={e => e.stopPropagation()}
                  >
                    {mother.name}
                  </Link>
                ) : (
                  p.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <Link
                    to={`/people/${father.slug}`}
                    onClick={e => e.stopPropagation()}
                  >
                    {father.name}
                  </Link>
                ) : (
                  p.fatherName || '-'
                )}
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
};
