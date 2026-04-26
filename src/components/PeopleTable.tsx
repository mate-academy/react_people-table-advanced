import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export enum Field {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';

  const findPersonSlug = (name: string | null) => {
    return people.find(p => p.name === name)?.slug || null;
  };

  const prepareSearchParams = (field: Field) => {
    if (currentSort === field) {
      if (currentOrder === 'desc') {
        return getSearchWith(searchParams, {
          sort: null,
          order: null,
        });
      } else {
        return getSearchWith(searchParams, { order: 'desc' });
      }
    } else {
      return getSearchWith(searchParams, {
        sort: field,
        order: null,
      });
    }
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(Field).map(([key, value]) => (
            <th key={key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <Link
                  to={{
                    search: prepareSearchParams(value),
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort-up':
                          currentSort === value && currentOrder !== 'desc',
                        'fa-sort-down':
                          currentSort === value && currentOrder === 'desc',
                        'fa-sort': currentSort !== value,
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
            key={person.slug}
            data-cy="person"
            className={classNames([
              {
                'has-background-warning': person.slug === slug,
              },
            ])}
          >
            <td>
              <Link
                to={{
                  pathname: `/people/${person.slug}`,
                  search: searchParams.toString(),
                }}
                className={classNames([
                  {
                    'has-text-danger': person.sex === 'f',
                  },
                ])}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {findPersonSlug(person.motherName) ? (
                <Link
                  to={{
                    pathname: `/people/${findPersonSlug(person.motherName)}`,
                    search: searchParams.toString(),
                  }}
                  className="has-text-danger"
                >
                  {person.motherName}
                </Link>
              ) : (
                <div>{person.motherName ?? '-'}</div>
              )}
            </td>
            <td>
              {findPersonSlug(person.fatherName) ? (
                <Link
                  to={{
                    pathname: `/people/${findPersonSlug(person.fatherName)}`,
                    search: searchParams.toString(),
                  }}
                >
                  {person.fatherName}
                </Link>
              ) : (
                <div>{person.fatherName ?? '-'}</div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
