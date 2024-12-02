import { FC } from 'react';
import { Person } from '../types';
import PersonItem from './PersonItem';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

enum SortBy {
  name = 'Name',
  sex = 'Sex',
  born = 'Born',
  died = 'Died',
}
export const PeopleTable: FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const sortedPeople = [...people].sort((a, b) => {
    if (sort === 'born' || sort === 'died') {
      return order === 'desc' ? b[sort] - a[sort] : a[sort] - b[sort];
    }

    if (sort === 'name' || sort === 'sex') {
      const comparison = a[sort].localeCompare(b[sort]);

      return order === 'desc' ? -comparison : comparison ;
    }

    return 0;
  });
  const modifiedPeople = sort ? sortedPeople : people;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortBy).map(sortField => {
            const [key, value] = sortField;

            return (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {value}
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        sort: sort === key && order === 'desc' ? null : key,
                        order: sort === key && !order ? 'desc' : null,
                      }),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== key,
                          'fa-sort-up': !order && sort === key,
                          'fa-sort-down': order === 'desc' && sort === key,
                        })}
                      />
                    </span>
                  </Link>
                </span>
              </th>
            );
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {modifiedPeople.map(person => (
          <PersonItem key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
