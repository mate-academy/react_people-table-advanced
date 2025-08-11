import React from 'react';

import { PersonItem } from '../PersonItem';
import { ColumnHeaders, Person } from '../../types';
import { SearchLink } from '../SearchLink/SearchLink';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  people: Person[];
}

const DESCENDING_ORDER = 'desc';

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const handleSortChange = (sortBy: string) => {
    const isSelected = sortBy === sort;

    if ((!sort && !order) || !isSelected) {
      return { sort: sortBy, order: null };
    }

    if (sort && !order && isSelected) {
      return { sort: sortBy, order: DESCENDING_ORDER };
    }

    if (sort && order) {
      return { sort: null, order: null };
    }

    return { sort: null, order: null };
  };

  const getSortedPeople = () => {
    let sortedPeople = [...people];

    if (sort) {
      const normalizedSort = sort.charAt(0).toUpperCase() + sort.slice(1);

      switch (normalizedSort) {
        case ColumnHeaders.name:
          sortedPeople = sortedPeople.sort((person1, person2) =>
            person1.name.localeCompare(person2.name),
          );
          break;
        case ColumnHeaders.sex:
          sortedPeople = sortedPeople.sort((person1, person2) =>
            person1.sex.localeCompare(person2.sex),
          );
          break;
        case ColumnHeaders.born:
          sortedPeople = sortedPeople.sort(
            (person1, person2) => person1.born - person2.born,
          );
          break;
        case ColumnHeaders.died:
          sortedPeople = sortedPeople.sort(
            (person1, person2) => person1.died - person2.died,
          );
          break;
        default:
          break;
      }
    }

    if (order) {
      sortedPeople = sortedPeople.reverse();
    }

    return sortedPeople;
  };

  const visiblePeople = getSortedPeople();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(ColumnHeaders).map(([key, value]) => {
            const hasSortOption =
              value !== ColumnHeaders.father && value !== ColumnHeaders.mother;

            return hasSortOption ? (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {value}
                  <SearchLink params={handleSortChange(key)}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== key,
                          'fa-sort-up': !order && sort === key,
                          'fa-sort-down': order && sort === key,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            ) : (
              <th key={key}>{value}</th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <PersonItem key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
