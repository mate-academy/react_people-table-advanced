import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  people: Person[];
}

const sortByParams = [
  { title: 'Name', key: 'name' },
  { title: 'Sex', key: 'sex' },
  { title: 'Born', key: 'born' },
  { title: 'Died', key: 'died' },
];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personId } = useParams();
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  function setSort(colKey: string) {
    let sortParams = {};

    switch (true) {
      case colKey !== sortBy:
        sortParams = {
          sort: colKey,
        };
        break;

      case order !== 'desc':
        sortParams = {
          order: 'desc',
        };
        break;

      default:
        sortParams = {
          sort: null,
          order: null,
        };
    }

    return getSearchWith(searchParams, sortParams);
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortByParams.map(col => (
            <th key={col.key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {col.title}
                <Link
                  to={{
                    search: setSort(col.key),
                  }}
                >
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort': sortBy !== col.key,
                        'fa-sort-up': sortBy === col.key && order !== 'desc',
                        'fa-sort-down': sortBy === col.key && order === 'desc',
                      })}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': personId === person.slug,
            })}
          >
            <td>
              <Link
                to={{
                  pathname: `/people/${person.slug}`,
                  search: searchParams.toString(),
                }}
                className={cn({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <Link
                  className="has-text-danger"
                  to={{
                    pathname: `/people/${person.mother.slug}`,
                    search: searchParams.toString(),
                  }}
                >
                  {person.motherName}
                </Link>
              ) : (
                person.motherName || '-'
              )}
            </td>

            <td>
              {person.father ? (
                <Link
                  to={{
                    pathname: `/people/${person.father.slug}`,
                    search: searchParams.toString(),
                  }}
                >
                  {person.fatherName}
                </Link>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
