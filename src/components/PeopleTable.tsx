/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useSearchParams,
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  people: Person[];
}

export const PeopleTable = ({ people }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const selectedSlug = location.pathname.split('/').pop();
  const navigate = useNavigate();

  const handleSort = (field: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (sort === field) {
      if (order === 'desc') {
        newParams.delete('sort');
        newParams.delete('order');
      } else {
        newParams.set('order', 'desc');
      }
    } else {
      newParams.set('sort', field);
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

  const handleRowClick = (slug: string) => {
    navigate(`/people/${slug}`);
  };

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  const sortedPeople = [...people].sort((a, b) => {
    if (!sort) {
      return 0;
    }

    const multiplier = order === 'desc' ? -1 : 1;

    switch (sort) {
      case 'name':
        return multiplier * a.name.localeCompare(b.name);
      case 'sex':
        return multiplier * a.sex.localeCompare(b.sex);
      case 'born':
        return multiplier * (a.born - b.born);
      case 'died':
        return multiplier * (a.died - b.died);
      default:
        return 0;
    }
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <button
                className="button is-small is-ghost"
                onClick={() => handleSort('name')}
              >
                <span className="icon">
                  <i className={`fas ${getSortIcon('name')}`} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <button
                className="button is-small is-ghost"
                onClick={() => handleSort('sex')}
              >
                <span className="icon">
                  <i className={`fas ${getSortIcon('sex')}`} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <button
                className="button is-small is-ghost"
                onClick={() => handleSort('born')}
              >
                <span className="icon">
                  <i className={`fas ${getSortIcon('born')}`} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <button
                className="button is-small is-ghost"
                onClick={() => handleSort('died')}
              >
                <span className="icon">
                  <i className={`fas ${getSortIcon('died')}`} />
                </span>
              </button>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const motherSlug = people.find(
            p => p.name === person.motherName,
          )?.slug;
          const fatherSlug = people.find(
            p => p.name === person.fatherName,
          )?.slug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                selectedSlug === person.slug ? 'has-background-warning' : ''
              }
              onClick={() => handleRowClick(person.slug)}
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  motherSlug ? (
                    <Link
                      to={`/people/${motherSlug}`}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </Link>
                  ) : (
                    <span>{person.motherName}</span>
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  fatherSlug ? (
                    <Link to={`/people/${fatherSlug}`}>
                      {person.fatherName}
                    </Link>
                  ) : (
                    <span>{person.fatherName}</span>
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
