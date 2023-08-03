import React from 'react';
import { Person, SortDirection, SortType } from '../types';
import { PersonCard } from './PersonCard';
import { SearchLink } from './SearchLink';
import { Icon } from './Icon';

type Props = {
  people: Person[];
  sortType: SortType;
  order: SortDirection;
};

export const PeopleTable: React.FC<Props> = (
  {
    people,
    sortType,
    order,
  },
) => {
  const setSortParams = (name: SortType) => {
    const firstClick = sortType !== name;
    const secondClick = sortType === name && order === SortDirection.ASC;

    if (firstClick) {
      return {
        sort: name,
        order: SortDirection.ASC,
      };
    }

    if (secondClick) {
      return {
        sort: name,
        order: SortDirection.DESC,
      };
    }

    return {
      sort: null,
      order: null,
    };
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
              <SearchLink
                params={setSortParams(SortType.NAME)}
              >
                <Icon
                  sortType={sortType}
                  order={order}
                  name={SortType.NAME}
                />
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={setSortParams(SortType.SEX)}
              >
                <Icon
                  sortType={sortType}
                  order={order}
                  name={SortType.SEX}
                />
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={setSortParams(SortType.BORN)}
              >
                <Icon
                  sortType={sortType}
                  order={order}
                  name={SortType.BORN}
                />
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={setSortParams(SortType.DIED)}
              >
                <Icon
                  sortType={sortType}
                  order={order}
                  name={SortType.DIED}
                />
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => (
          <PersonCard
            key={person.slug}
            person={person}
            people={people}
          />
        ))}
      </tbody>
    </table>
  );
};
