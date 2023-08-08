import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonItem } from './PersonItem/PersonItem';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  slug: string | undefined;
  isLoading: boolean;
};

export const PeopleTable: React.FC<Props> = ({ people, slug, isLoading }) => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const categoryFilter = ['Name', 'Sex', 'Born', 'Died'];

  const preparePeople = () => {
    let newPeople = [...people];

    if (query) {
      const normalizedQuery = query.trim().toLowerCase();

      newPeople = newPeople.filter(person => {
        return person.name.toLowerCase().includes(normalizedQuery)
          || (person.motherName || '').toLowerCase().includes(normalizedQuery)
          || (person.fatherName || '').toLowerCase().includes(normalizedQuery);
      });
    }

    if (sex) {
      newPeople = newPeople.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      newPeople = newPeople.filter(person => {
        return centuries.includes(Math.ceil(person.born / 100).toString());
      });
    }

    if (sort) {
      newPeople = newPeople.sort((a, b) => {
        switch (sort) {
          case 'Name':
            return a.name.localeCompare(b.name);
          case 'Sex':
            return a.sex.localeCompare(b.sex);
          case 'Born':
            return a.born - b.born;
          case 'Died':
            return a.died - b.died;
          default:
            return 0;
        }
      });
    }

    if (order === 'desc') {
      newPeople = newPeople.reverse();
    }

    return newPeople;
  };

  const calculateOrder = (value: string) => {
    if (sort === value) {
      return order ? '' : 'desc';
    }

    return '';
  };

  const calculateSort = (value: string) => {
    if (sort === value && order === 'desc') {
      return '';
    }

    return value;
  };

  if (!isLoading && !preparePeople().length) {
    return (
      <p>
        There are no people matching the current search criteria
      </p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {categoryFilter.map((column) => (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column}
                <SearchLink
                  params={{
                    sort: calculateSort(column) || null,
                    order: calculateOrder(column) || null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort-down': sort === column && order === 'desc',
                        'fa-sort-up': sort === column && order !== 'desc',
                        'fa-sort': sort !== column,
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparePeople().map(person => (
          <PersonItem
            person={person}
            slug={slug}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
