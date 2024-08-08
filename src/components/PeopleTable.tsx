import React, { memo } from 'react';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import { useSearchParams, Link } from 'react-router-dom';
import classNames from 'classnames';

const PeopleTable = ({ people }: { people: Person[] }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  function sortHandler(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sortValue: string,
  ) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (sortParam === sortValue) {
      params.set('order', 'desc');
    } else {
      params.set('sort', sortValue);
    }

    if (sortParam && order) {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(value => (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {value}
                <Link
                  onClick={event => sortHandler(event, value.toLowerCase())}
                  to={{
                    search: searchParams.toString(),
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sortParam !== value.toLowerCase(),
                        'fa-sort-up':
                          sortParam === value.toLowerCase() && !order,
                        'fa-sort-down':
                          order === 'desc' && sortParam === value.toLowerCase(),
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
          <PersonItem key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};

export default memo(PeopleTable);
