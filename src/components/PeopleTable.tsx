import cn from 'classnames';
import React, { useState } from 'react';
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
  const [sortOrder, setOrder] = useState<SortOrders>(SortOrders.Default);

  const centuries = searchParams.getAll('centuries') || [];
  const filterBySex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const searchOrder = (searchParams.get('order') ||
    SortOrders.Default) as SortOrders;
  const searchOption = (searchParams.get('sort') || '') as SortOptions;

  const filteredPeople = getFilteredPeople(
    people,
    filterBySex,
    query,
    centuries,
    searchOption,
    searchOrder,
  );

  function handleSortOption(option: SortOptions) {
    switch (sortOrder) {
      case SortOrders.Default:
        return getSearchWith({ sort: option }, searchParams);

      case SortOrders.Ascedent:
        return getSearchWith(
          { sort: option, order: SortOrders.Descedent },
          searchParams,
        );

      case SortOrders.Descedent:
        return getSearchWith({ sort: null, order: null }, searchParams);

      default:
        break;
    }

    return;
  }

  function handleSetOrder() {
    switch (sortOrder) {
      case SortOrders.Default:
        setOrder(SortOrders.Ascedent);

        break;

      case SortOrders.Ascedent:
        setOrder(SortOrders.Descedent);

        break;
      case SortOrders.Descedent:
        setOrder(SortOrders.Default);

        break;

      default:
        break;
    }
  }

  function setClassName(value: SortOptions) {
    return {
      'fa-sort': !searchOption || searchOption !== value,
      'fa-sort-up': searchOption === value && !searchOrder,
      'fa-sort-down': searchOrder,
    };
  }

  const sortBar = Object.entries(SortOptions);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {(filteredPeople.length !== 0 && (
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
                      onClick={handleSetOrder}
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
      )) || <p>{Errors.FiltersNoMatch}</p>}
    </table>
  );
};
