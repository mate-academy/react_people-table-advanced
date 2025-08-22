import { useContext } from 'react';
import { Person } from '../types';
import { SortField } from '../types/SortField';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { FiltersContext } from '../context/FiltersContext';
import { SearchLink } from './SearchLink';
import { PeopleContext } from '../context/PeopleContext';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  isSelectedPerson: Person | null;
};

export const PeopleTable: React.FC<Props> = ({ people, isSelectedPerson }) => {
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
          const isSelected = isSelectedPerson
            ? person.slug === isSelectedPerson.slug
            : false;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink name={person.name} people={people} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  <PersonLink name={person.motherName} people={people} />
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  <PersonLink name={person.fatherName} people={people} />
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
