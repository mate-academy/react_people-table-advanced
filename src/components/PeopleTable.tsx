import {
  Link,
  useParams,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people?: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  if (!people) {
    return;
  }

  const handleHeaderSort = (th: string) => {
    const next = new URLSearchParams(searchParams);
    const currentSort = next.get('sort');
    const currentOrder = next.get('order');

    let sortField: string | null = th;
    let orderField: string | null = null;

    if (currentSort !== th) {
      sortField = th;
      orderField = null;
    } else {
      if (currentOrder === 'desc') {
        sortField = null;
        orderField = null;
      } else {
        orderField = 'desc';
      }
    }

    return getSearchWith({ sort: sortField, order: orderField }, searchParams);
  };

  const peopleByName = new Map(people?.map(p => [p.name, p]));

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
              <Link
                to={{
                  pathname: location.pathname,
                  search: handleHeaderSort('name'),
                }}
              >
                <span className="icon">
                  <i
                    className={cn(
                      'fas',
                      searchParams.has('order') &&
                        searchParams.get('sort') === 'name'
                        ? 'fa-sort-down'
                        : searchParams.get('sort') === 'name'
                          ? 'fa-sort-up'
                          : 'fa-sort',
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  pathname: location.pathname,
                  search: handleHeaderSort('sex'),
                }}
              >
                <span className="icon">
                  <i
                    className={cn(
                      'fas',
                      searchParams.has('order') &&
                        searchParams.get('sort') === 'sex'
                        ? 'fa-sort-down'
                        : searchParams.get('sort') === 'sex'
                          ? 'fa-sort-up'
                          : 'fa-sort',
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  pathname: location.pathname,
                  search: handleHeaderSort('born'),
                }}
              >
                <span className="icon">
                  <i
                    className={cn(
                      'fas',
                      searchParams.has('order') &&
                        searchParams.get('sort') === 'born'
                        ? 'fa-sort-down'
                        : searchParams.get('sort') === 'born'
                          ? 'fa-sort-up'
                          : 'fa-sort',
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  pathname: location.pathname,
                  search: handleHeaderSort('died'),
                }}
              >
                <span className="icon">
                  <i
                    className={cn(
                      'fas',
                      searchParams.has('order') &&
                        searchParams.get('sort') === 'died'
                        ? 'fa-sort-down'
                        : searchParams.get('sort') === 'died'
                          ? 'fa-sort-up'
                          : 'fa-sort',
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = peopleByName.get(person.motherName as string);
          const father = peopleByName.get(person.fatherName as string);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn(
                slug === person.slug ? 'has-background-warning' : '',
              )}
            >
              <td>
                <Link
                  to={person.slug}
                  className={cn(person.sex === 'f' ? 'has-text-danger' : '')}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <Link
                    to={`${mother.slug}`}
                    className={cn(mother.sex === 'f' ? 'has-text-danger' : '')}
                  >
                    {mother.name}
                  </Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <Link to={`${father.slug}`}>{father.name}</Link>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
