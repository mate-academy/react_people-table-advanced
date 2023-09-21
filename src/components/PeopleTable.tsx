import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useMemo } from 'react';
import { Person } from '../types';
import { GENDER_FEMALE, NOT_SET_VALUE, SortCategories } from '../utils/vars';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const onSortChange = (sortParam: string) => {
    const sorts: { [key: string]: string | null } = { sort, order };

    if (!sorts.sort) {
      sorts.sort = sortParam;

      return sorts;
    }

    if (!sorts.order && sorts.sort && sorts.sort === sortParam) {
      sorts.order = 'desc';

      return sorts;
    }

    if (!sorts.order && sorts.sort && sorts.sort !== sortParam) {
      sorts.sort = sortParam;

      return sorts;
    }

    if (sorts.order && sorts.sort && sorts.sort === sortParam) {
      sorts.sort = null;
      sorts.order = null;

      return sorts;
    }

    if (sorts.order && sorts.sort && sorts.sort !== sortParam) {
      sorts.sort = sortParam;
      sorts.order = null;
    }

    return sorts;
  };

  const sortLink = useMemo(() => onSortChange, [sort, order]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortCategories).map(value => (
            <th>
              <span
                className="is-flex is-flex-wrap-nowrap"
              >
                {value[0].toUpperCase() + value.slice(1)}
                <Link to={{
                  search: getSearchWith(searchParams, {
                    sort: sortLink(value).sort,
                    order: sortLink(value).order,
                  }),
                }}
                >
                  <span className="icon">
                    <i className={classNames('fas', {
                      'fa-sort-up': sort === value && !order,
                      'fa-sort-down': sort === value && order,
                      'fa-sort': (!sort || sort !== value),
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
        {people.map((person) => {
          const {
            name,
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            father,
            mother,
          } = person;

          const isFemale = person.sex === GENDER_FEMALE;

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === personSlug,
              })}
              key={slug}
            >
              <td>
                <Link
                  to={slug}
                  className={classNames({
                    'has-text-danger': isFemale,
                  })}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? (
                  <Link
                    to={`${mother.slug}`}
                    replace
                    className="has-text-danger"
                  >
                    {motherName}
                  </Link>
                ) : (
                  motherName || NOT_SET_VALUE
                )}
              </td>
              <td>
                {father ? (
                  <Link to={`${father.slug}`}>
                    {fatherName}
                  </Link>
                ) : (
                  fatherName || NOT_SET_VALUE
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
