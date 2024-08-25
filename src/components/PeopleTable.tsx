import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  peopleWithLinks: Person[];
  slug: string | undefined;
  sorting: {
    field: string | null;
    order: string | null;
  };
  setSorting: (sorting: { field: string | null; order: string | null }) => void;
};

export const PeopleTable: React.FC<Props> = ({
  peopleWithLinks,
  slug,
  sorting,
  setSorting,
}) => {
  const [searchParams] = useSearchParams();

  const handleSort = (field: string | null) => {
    if (sorting.field === field) {
      if (sorting.order === 'asc') {
        setSorting({ field, order: 'desc' });
      } else if (sorting.order === 'desc') {
        setSorting({ field: null, order: null });
      } else {
        setSorting({ field, order: 'asc' });
      }
    } else {
      setSorting({ field, order: 'asc' });
    }
  };

  const generateLinkPath = (field: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (sorting.field === field) {
      if (sorting.order === 'asc') {
        params.set('sort', field);
        params.set('order', 'desc');
      } else if (sorting.order === 'desc') {
        params.delete('sort');
        params.delete('order');
      } else {
        params.set('sort', field);
      }
    } else {
      params.set('sort', field);
    }

    return params.toString();
  };

  function getSortIconClass(
    field: string,
    sortField: { field: string | null; order: string | null },
  ) {
    if (sortField.field === field) {
      if (sortField.order === 'asc') {
        return 'fas fa-sort-up';
      } else if (sortField.order === 'desc') {
        return 'fas fa-sort-down';
      }
    }

    return 'fas fa-sort';
  }

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
                to={`/people${slug ? `/${slug}` : ''}?${generateLinkPath('name')}`}
                onClick={() => handleSort('name')}
              >
                <span className="icon">
                  <i className={getSortIconClass('name', sorting)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={`/people${slug ? `/${slug}` : ''}?${generateLinkPath('sex')}`}
                onClick={() => handleSort('sex')}
              >
                <span className="icon">
                  <i className={getSortIconClass('sex', sorting)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={`/people${slug ? `/${slug}` : ''}?${generateLinkPath('born')}`}
                onClick={() => handleSort('born')}
              >
                <span className="icon">
                  <i className={getSortIconClass('born', sorting)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={`/people${slug ? `/${slug}` : ''}?${generateLinkPath('died')}`}
                onClick={() => handleSort('died')}
              >
                <span className="icon">
                  <i className={getSortIconClass('died', sorting)} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {peopleWithLinks.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <Link
                to={`/people/${person.slug}?${searchParams.toString()}`}
                className={classNames({
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
              {!person.motherName && '-'}
              {person.mother ? (
                <Link
                  to={`/people/${person.mother?.slug}?${searchParams.toString()}`}
                  className={classNames({
                    'has-text-danger': person.mother.sex === 'f',
                  })}
                >
                  {person.motherName}
                </Link>
              ) : (
                person.motherName
              )}
            </td>
            <td>
              {!person.fatherName && '-'}
              {person.father ? (
                <Link
                  to={`/people/${person.father?.slug}?${searchParams.toString()}`}
                  className={classNames({
                    'has-text-danger': person.father.sex === 'f',
                  })}
                >
                  {person.fatherName}
                </Link>
              ) : (
                person.fatherName
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
