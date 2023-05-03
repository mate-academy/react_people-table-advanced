import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SortType } from '../types/SortType';

type Props = {
  people: Person[],
  sort: string,
  order: string,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  sort,
  order,
}) => {
  const { slug = '' } = useParams();

  const capitalizeFirstLetter = (text : string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const getSort = (
    prevSort: string | null,
    prevOrder: string | null,
    field: SortType,
  ) => {
    if (prevSort === field && !prevOrder) {
      return { sort: prevSort, order: 'desc' };
    }

    if (prevSort === field && order === 'desc') {
      return { sort: null, order: null };
    }

    return { sort: field, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortType).map(value => (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {`${capitalizeFirstLetter(value)}`}
                <SearchLink params={getSort(sort, order, value)}>
                  <span className="icon">
                    <i
                      className={classNames(
                        'fas',
                        {
                          'fa-sort': sort !== value,
                          'fa-sort-up': sort === value && !order,
                          'fa-sort-down': sort === value && order,
                        },
                      )}
                    />
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
        {people.map(person => (
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
            <td>
              {person.sex}
            </td>
            <td>
              {person.born}
            </td>
            <td>
              {person.died}
            </td>
            <td>
              {person.mother
                ? <PersonLink person={person.mother} />
                : (person.motherName || '-')}
            </td>
            <td>
              {person.father
                ? <PersonLink person={person.father} />
                : (person.fatherName || '-')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
