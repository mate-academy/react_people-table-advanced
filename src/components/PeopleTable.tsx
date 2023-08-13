import classNames from 'classnames';

import { Person } from '../types';
import { OrderOption, SortOptions } from '../utils/data';
import { PersonRow } from './PersonRow';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  sort: SortOptions;
  order: OrderOption;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  sort,
  order,
}) => {
  const sortParams = (option: SortOptions) => {
    if (!sort || sort !== option) {
      return { sort: option, order: null };
    }

    if (sort === option && !order) {
      return { sort: option, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortOptions).map(option => {
            return (
              <th key={option}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                  <SearchLink params={sortParams(option)}>
                    <span className="icon">
                      <i className={classNames(
                        'fas',
                        { 'fa-sort': sort !== option },
                        { 'fa-sort-up': sort === option && !order },
                        { 'fa-sort-down': sort === option && order },
                      )}
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
        {people.map(person => (
          <PersonRow
            key={person.slug}
            person={person}
            people={people}
          />
        ))}
      </tbody>
    </table>
  );
};
