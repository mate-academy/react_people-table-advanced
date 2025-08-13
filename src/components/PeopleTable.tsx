import { useContext } from 'react';
import { PeopleContext } from '../context/PeopleContext';
import { Person } from '../types';
import { PersonRow } from './PersonRow';
import { SortField } from '../types/SortField';
import { FiltersContext } from '../context/FiltersContext';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

type Props = {
  selectedPerson: Person | null;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ selectedPerson }) => {
  const { visiblePeople } = useContext(PeopleContext);
  const { sort, order } = useContext(FiltersContext);

  const getSortParams = (value: SortField) => {
    let params = {};

    if (sort !== value) {
      params = { sort: value, order: null };
    } else if (order === '') {
      params = { order: 'desc' };
    } else if (order === 'desc') {
      params = { sort: null, order: null };
    } else {
      params = { order: 'desc' };
    }

    return params;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortField).map(value => {
            const title = value[0].toUpperCase() + value.slice(1);
            const params = getSortParams(value);

            return (
              <th key={value}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {title}
                  <SearchLink params={params} className="icon has-text-link">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== value,
                        'fa-sort-up': sort === value && !order,
                        'fa-sort-down': sort === value && order === 'desc',
                      })}
                    />
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
        {visiblePeople.map(person => {
          const isSelected = selectedPerson
            ? person.slug === selectedPerson.slug
            : false;

          return (
            <PersonRow
              key={person.slug}
              person={person}
              isSelected={isSelected}
            />
          );
        })}
      </tbody>
    </table>
  );
};
