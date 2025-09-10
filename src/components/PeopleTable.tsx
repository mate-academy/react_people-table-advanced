import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import PersonLink from './PersonLink';
import cn from 'classnames';

interface PeopleTableProps {
  people: Person[];
  selectedSlug: string;
  sort: string;
  order: string;
}

type SortField = 'name' | 'sex' | 'born' | 'died';

const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedSlug,
  sort,
  order,
}) => {
  const getSortParams = (key: SortField) => {
    if (sort !== key) {
      return { sort: key, order: null };
    }

    if (order === 'asc') {
      return { sort: key, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getIconClass = (key: SortField) => {
    if (sort !== key) {
      return 'fa-sort';
    }

    if (order === 'asc') {
      return 'fa-sort-up';
    }

    return 'fa-sort-down';
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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={cn('fas', getIconClass('name'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={cn('fas', getIconClass('sex'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={cn('fas', getIconClass('born'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={cn('fas', getIconClass('died'))} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = person.slug === selectedSlug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': isSelected,
              })}
            >
              <td>
                <PersonLink name={person.name} people={people} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink name={person.motherName} people={people} />
              </td>
              <td>
                <PersonLink name={person.fatherName} people={people} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PeopleTable;
