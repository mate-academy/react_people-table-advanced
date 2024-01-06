/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { SORT_DESC, SearchParams, SortField } from '../enums';
import { OrderType, Person } from '../types';
import { PersonRow } from './PersonRow';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(SearchParams.Sort) || '';
  const order = searchParams.get(SearchParams.Order) || '';

  const getSortParams = (sortField: SortField) => {
    let sortParam = null;
    let orderParam = null;

    if (sortField === sort) {
      if (!(sort && order)) {
        sortParam = sortField;
        orderParam = SORT_DESC;
      }
    } else {
      sortParam = sortField;
    }

    return {
      [SearchParams.Sort]: sortParam as SortField,
      [SearchParams.Order]: orderParam as OrderType,
    };
  };

  return (
    people.length ? (
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {Object.entries(SortField).map(([key, value]) => (
              <th key={value}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <SearchLink params={getSortParams(value)}>
                    <span className="icon">
                      <i className={classNames('fas', {
                        'fa-sort': sort !== value,
                        'fa-sort-up': sort === value && !order,
                        'fa-sort-down': sort === value && order,
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
          {people.map((person) => (
            <PersonRow key={person.slug} person={person} />
          ))}
        </tbody>
      </table>
    ) : (
      <p>
        There are no people matching the current search criteria
      </p>
    )
  );
};
