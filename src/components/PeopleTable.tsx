import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonItem } from './PersonItem';

export type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortWith = (sortField: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams);

    if (sortField === sort) {
      if (order === 'desc') {
        updatedSearchParams.delete('sort');
        updatedSearchParams.delete('order');
      } else {
        updatedSearchParams.set('order', 'desc');
      }
    } else {
      updatedSearchParams.set('sort', sortField);
      updatedSearchParams.delete('order');
    }

    return updatedSearchParams.toString();
  };

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
                  search: getSortWith('name'),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !sort || sort !== 'name',
                      'fa-sort-up': sort === 'name' && !order,
                      'fa-sort-down': sort === 'name' && order === 'desc',
                    })}
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
                  search: getSortWith('sex'),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !sort || sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && !order,
                      'fa-sort-down': sort === 'sex' && order === 'desc',
                    })}
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
                  search: getSortWith('born'),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !sort || sort !== 'born',
                      'fa-sort-up': sort === 'born' && !order,
                      'fa-sort-down': sort === 'born' && order === 'desc',
                    })}
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
                  search: getSortWith('died'),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !sort || sort !== 'died',
                      'fa-sort-up': sort === 'died' && !order,
                      'fa-sort-down': sort === 'died' && order === 'desc',
                    })}
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
        {people.map(person => (
          <PersonItem person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
