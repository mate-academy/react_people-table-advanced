import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useMemo } from 'react';
import { Person } from '../types';
import { SortCategories } from '../utils/vars';
import { getSearchWith } from '../utils/searchHelper';
import { handleChangeSort } from '../utils/handleChangeSort';
import { PersonRow } from './PersonRow';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortLink = useMemo(() => handleChangeSort,
    [sort, order]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortCategories).map(value => (
            <th key={value}>
              <span
                className="is-flex is-flex-wrap-nowrap"
              >
                {value[0].toUpperCase() + value.slice(1)}
                <Link to={{
                  search: getSearchWith(searchParams, {
                    sort: sortLink(value, sort, order).sort,
                    order: sortLink(value, sort, order).order,
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
          return (
            <PersonRow person={person} />
          );
        })}
      </tbody>
    </table>
  );
};
