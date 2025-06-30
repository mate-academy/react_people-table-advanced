/* eslint-disable jsx-a11y/control-has-associated-label */

import { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { SortTypes } from '../../types/SortTypes';
import { PersonLink } from '../PersonLink/PersonLink';
import { SearchLink } from '../SearchLink/SearchLink';

const TABLE_SORT: Array<{
  label: string;
  field: string | null;
}> = [
  { label: 'Name', field: SortTypes.Name },
  { label: 'Sex', field: SortTypes.Sex },
  { label: 'Born', field: SortTypes.Born },
  { label: 'Died', field: SortTypes.Died },
  { label: 'Mother', field: null },
  { label: 'Father', field: null },
];

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable: FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const findPersonByName = (name: string | undefined) =>
    people.find(p => p.name === name);

  const getSortParams = (field: string) => {
    if (currentSort === field) {
      if (!currentOrder || currentOrder === 'asc') {
        return { sort: field, order: 'desc' };
      } else {
        return { sort: null, order: null };
      }
    } else {
      return { sort: field, order: null };
    }
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_SORT.map(({ label, field }) => (
            <th key={label}>
              <span className="is-flex is-flex-wrap-nowrap">
                {label}
                {field && (
                  <SearchLink params={getSortParams(field)}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': currentSort !== field,
                          'fa-sort-up': currentSort === field && !currentOrder,
                          'fa-sort-down':
                            currentSort !== currentOrder && currentOrder,
                        })}
                      />
                    </span>
                  </SearchLink>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people &&
          people.map(person => (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  findPersonByName(person.motherName) ? (
                    <PersonLink person={findPersonByName(person.motherName)!} />
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  findPersonByName(person.fatherName) ? (
                    <PersonLink person={findPersonByName(person.fatherName)!} />
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
