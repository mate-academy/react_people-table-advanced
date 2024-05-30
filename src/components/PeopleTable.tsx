import classNames from 'classnames';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import PersonLink from './PersonLink';

interface Props {
  people: Person[];
  isError: boolean;
}

export const PeopleTable: FC<Props> = ({ people, isError }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = getFilteredPeople(people, query, centuries, sex);

  if (isError) {
    return null;
  }

  if (visiblePeople.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  const getSortLink = (field: string) => {
    if (sort === field) {
      if (order === 'asc') {
        searchParams.set('order', 'desc');
      } else if (order === 'desc') {
        searchParams.delete('sort');
        searchParams.delete('order');
      } else {
        searchParams.set('order', 'asc');
      }
    } else {
      searchParams.set('sort', field);
      searchParams.set('order', 'asc');
    }

    setSearchParams(searchParams);
  };

  const sortedPeople = [...visiblePeople];

  if (sort) {
    const sortField = sort as keyof Person;

    sortedPeople.sort((a, b) => {
      const aValue = a[sortField] ?? '';
      const bValue = b[sortField] ?? '';

      if (aValue === bValue) {
        return 0;
      }

      const comparison = aValue < bValue ? -1 : 1;

      return order === 'desc' ? -comparison : comparison;
    });
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
              <a onClick={() => getSortLink('name')} aria-label="Sort by name">
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && order !== 'desc',
                      'fa-sort-down': sort === 'name' && order === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => getSortLink('sex')} aria-label="Sort by sex">
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && order !== 'desc',
                      'fa-sort-down': sort === 'sex' && order === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => getSortLink('born')} aria-label="Sort by born">
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && order !== 'desc',
                      'fa-sort-down': sort === 'born' && order === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => getSortLink('died')} aria-label="Sort by died">
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && order !== 'desc',
                      'fa-sort-down': sort === 'died' && order === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <PersonLink people={people} person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
