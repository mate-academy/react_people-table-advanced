import React from 'react';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import { Sort } from '../types/sort';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  preparedPeople: Person[];
}

type SortParams = {
  [key: string]: string | null;
};

const sortTableBy = (
  value: string,
  sort: string,
  order: string,
): SortParams => {
  const isSortValid = sort === value;
  const isOrderValid = order === 'desc';

  if (!isSortValid) {
    return { sort: value };
  }

  if (isSortValid && !isOrderValid) {
    return { order: 'desc' };
  }

  if (isSortValid && isOrderValid) {
    return { sort: null, order: null };
  }

  return {};
};

export const PeopleTable: React.FC<Props> = ({ preparedPeople }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(Sort).map(([key, value]) => {
            const isSortValid = sort === value;
            const isOrderValid = order === 'desc';

            return (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <SearchLink params={sortTableBy(value, sort, order)}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': !isSortValid,
                          'fa-sort-up': isSortValid && !isOrderValid,
                          'fa-sort-down': isSortValid && isOrderValid,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => (
          <PersonItem key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
