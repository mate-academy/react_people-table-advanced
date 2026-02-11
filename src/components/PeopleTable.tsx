import cn from 'classnames';
import React from 'react';
import { Person } from '../types';
import { PeopleLink } from './PeopleLink';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Errors } from '../types/Errors';
import { getSearchWith } from '../utils/searchHelper';
import { SortOrders } from '../types/SortOrders';
import { SortOptions } from '../types/SortOptions';
import { getFilteredPeople } from '../utils/getFilteredPeople';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || [];
  const filterBySex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const sortOrder = (searchParams.get('order') ||
    SortOrders.Default) as SortOrders;
  const sortOption = (searchParams.get('sort') || '') as SortOptions;

  const sortBar = Object.entries(SortOptions);

  const filteredPeople = getFilteredPeople(
    people,
    filterBySex,
    query,
    centuries,
    sortOption,
    sortOrder,
  );

  function handleSortOption(option: SortOptions) {
    if (option !== sortOption) {
      return getSearchWith(searchParams, { sort: option, order: null });
    }

    if (sortOrder !== SortOrders.Descendant) {
      return getSearchWith(searchParams, {
        sort: option,
        order: SortOrders.Descendant,
      });
    }

    return getSearchWith(searchParams, { sort: null, order: null });
  }

  function setClassName(value: SortOptions) {
    const isActive = sortOption === value;

    return {
      'fa-sort': !isActive,
      'fa-sort-up': isActive && sortOrder === SortOrders.Default,
      'fa-sort-down': isActive && sortOrder === SortOrders.Descendant,
    };
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {filteredPeople.length !== 0 ? (
        <>
          <thead>
            <tr>
              {sortBar.map(([key, value]) => (
                <th key={key}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {key}
                    <Link
                      to={{
                        search: handleSortOption(value),
                      }}
                    >
                      <span className="icon">
                        <i className={cn('fas', setClassName(value))} />
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
            {filteredPeople.map(person => (
              <PeopleLink
                key={person.slug}
                person={person}
                personSlug={personSlug}
              />
            ))}
          </tbody>
        </>
      ) : (
        <tbody>
          <tr>
            <td>
              <p>{Errors.FiltersNoMatch}</p>
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
};
