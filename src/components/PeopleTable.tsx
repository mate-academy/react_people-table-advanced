import { useContext } from 'react';
import { Context } from '../context/PeopleContext';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { PersonItem } from './PersonItem';
import classNames from 'classnames';
import { SortTypeValue } from '../types/SortTypeValue';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const { visiblePeople } = useContext(Context);

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const sortedValue = (sortValue: SortTypeValue) =>
    sort === sortValue
      ? order
        ? { sort: null, order: null }
        : { sort: sortValue, order: 'desc' }
      : { sort: sortValue, order: null };

  const classIcon = (value: string) => {
    return classNames('fa', {
      'fa-sort': sort !== value,
      'fa-sort-up': sort === value && !order,
      'fa-sort-down': sort === value && order,
    });
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(value => (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {value[0].toUpperCase() + value.slice(1)}
                <SearchLink params={sortedValue(value as SortTypeValue)}>
                  <span className="icon">
                    <i className={classIcon(value)} />
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
        {visiblePeople.map(person => (
          <PersonItem
            person={person}
            people={visiblePeople}
            key={person.name}
          />
        ))}
      </tbody>
    </table>
  );
};
