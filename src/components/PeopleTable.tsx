import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SortParams } from '../helper/SortParams';
import { FilterParams } from '../helper/FilterParams';

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
      if (sorting.order === SortParams.ORDER_ASC) {
        setSorting({ field, order: SortParams.ORDER_DESC });
      } else if (sorting.order === SortParams.ORDER_DESC) {
        setSorting({ field: null, order: null });
      } else {
        setSorting({ field, order: SortParams.ORDER_ASC });
      }
    } else {
      setSorting({ field, order: SortParams.ORDER_ASC });
    }
  };

  const generateLinkPath = (field: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (sorting.field === field) {
      if (sorting.order === SortParams.ORDER_ASC) {
        params.set(SortParams.SORT, field);
        params.set(SortParams.ORDER, SortParams.ORDER_DESC);
      } else if (sorting.order === SortParams.ORDER_DESC) {
        params.delete(SortParams.SORT);
        params.delete(SortParams.ORDER);
      } else {
        params.set(SortParams.SORT, field);
      }
    } else {
      params.set(SortParams.SORT, field);
    }

    return params.toString();
  };

  function getSortIconClass(
    field: string,
    sortField: { field: string | null; order: string | null },
  ) {
    if (sortField.field === field) {
      if (sortField.order === SortParams.ORDER_ASC) {
        return 'fas fa-sort-up';
      } else if (sortField.order === SortParams.ORDER_DESC) {
        return 'fas fa-sort-down';
      }
    }

    return 'fas fa-sort';
  }

  const SORT_BY_NAME_LINK = `/people${slug ? `/${slug}` : ''}?${generateLinkPath(SortParams.SORT_NAME)}`;
  const SORT_BY_SEX_LINK = `/people${slug ? `/${slug}` : ''}?${generateLinkPath(SortParams.SORT_SEX)}`;
  const SORT_BY_BORN_LINK = `/people${slug ? `/${slug}` : ''}?${generateLinkPath(SortParams.SORT_BORN)}`;
  const SORT_BY_DIED_LINK = `/people${slug ? `/${slug}` : ''}?${generateLinkPath(SortParams.SORT_DIED)}`;

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
                to={SORT_BY_NAME_LINK}
                onClick={() => handleSort(SortParams.SORT_NAME)}
              >
                <span className="icon">
                  <i
                    className={getSortIconClass(SortParams.SORT_NAME, sorting)}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={SORT_BY_SEX_LINK}
                onClick={() => handleSort(SortParams.SORT_SEX)}
              >
                <span className="icon">
                  <i
                    className={getSortIconClass(SortParams.SORT_SEX, sorting)}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={SORT_BY_BORN_LINK}
                onClick={() => handleSort(SortParams.SORT_BORN)}
              >
                <span className="icon">
                  <i
                    className={getSortIconClass(SortParams.SORT_BORN, sorting)}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={SORT_BY_DIED_LINK}
                onClick={() => handleSort(SortParams.SORT_DIED)}
              >
                <span className="icon">
                  <i
                    className={getSortIconClass(SortParams.SORT_DIED, sorting)}
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
                  'has-text-danger': person.sex === FilterParams.SEX_FEMALE,
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
                    'has-text-danger':
                      person.mother.sex === FilterParams.SEX_FEMALE,
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
                    'has-text-danger':
                      person.father.sex === FilterParams.SEX_FEMALE,
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
