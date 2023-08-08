import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonItem } from './PersonItem/PersonItem';
import { SearchLink } from './SearchLink';
import { preparePeople } from '../utils/helpers';

type Props = {
  people: Person[];
  slug: string | undefined;
  isLoading: boolean;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  slug,
  isLoading,
}) => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const categoryFilter = ['Name', 'Sex', 'Born', 'Died'];

  const preparedPeople = useMemo(
    () => preparePeople(
      people,
      {
        query,
        sex,
        centuries,
        sort,
        order,
      },
    ),
    [people, query, sex, centuries, sort, order],
  );

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

  if (!isLoading && !preparedPeople.length) {
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
        {preparedPeople.map(person => (
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
