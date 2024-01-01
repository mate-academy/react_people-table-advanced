import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { ErrorMessages } from '../../types/ErrorMessages';
import { SearchParams } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

interface Props {
  people: Person[],
}

const SORT_BY_FIELDS = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const isPeopleEmpty = people.length > 0;

  const getSortingParams = (sortBy: string): SearchParams => {
    if (sort !== sortBy) {
      return { sort: sortBy, order: null };
    }

    if (!order) {
      return { order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIconClass = (sortBy: string): string => {
    return cn('fas', {
      'fa-sort': sort !== sortBy,
      'fa-sort-up': sort === sortBy && !order,
      'fa-sort-down': sort === sortBy && order,
    });
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_BY_FIELDS.map(sortByField => {
            const sortFieldToLowerCase = sortByField.toLowerCase();

            return (
              <th key={sortByField}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {sortByField}
                  <SearchLink
                    params={getSortingParams(sortFieldToLowerCase)}
                  >
                    <span className="icon">
                      <i
                        className={getSortIconClass(sortFieldToLowerCase)}
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
        {!isPeopleEmpty ? (
          <p data-cy="noPeopleMessage">{ErrorMessages.EMPTY_PEOPLE}</p>
        ) : (
          <>
            {people.map((person) => (
              <PersonLink person={person} key={person.slug} />
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};
