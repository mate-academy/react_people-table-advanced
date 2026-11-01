import React from 'react';
import { Person } from '../../types';
import { PersonRow } from '../PersonRow';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { SearchParams } from '../../utils/searchHelper';
import classNames from 'classnames';

const COLUMNS = [
  { title: 'Name', field: 'name' },
  { title: 'Sex', field: 'sex' },
  { title: 'Born', field: 'born' },
  { title: 'Died', field: 'died' },
];

type Props = {
  people: Person[];
  allPeople: Person[];
};
export const PeopleTable: React.FC<Props> = ({ people, allPeople }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortParams = (field: string): SearchParams => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getIconClass = (field: string) =>
    classNames('fas', {
      'fa-sort': sort !== field,
      'fa-sort-up': sort === field && order !== 'desc',
      'fa-sort-down': sort === field && order === 'desc',
    });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map(colum => (
            <th key={colum.field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {colum.title}
                <SearchLink params={getSortParams(colum.field)}>
                  <span className="icon">
                    <i className={getIconClass(colum.field)} />
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
          <PersonRow person={person} people={allPeople} key={person.slug} />
        ))}

        {people.length === 0 && (
          <tr>
            <td colSpan={6}>
              <p>There are no people matching the current search criteria</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
