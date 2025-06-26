import React from 'react';
import { PersonRow } from '../PersonRow';
import { Person } from '../../../../types/Person';
import { SearchLink } from '../../../../components/SearchLink';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

const TABLE_ROWS_FOR_SORTING = ['Name', 'Sex', 'Born', 'Died'];

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || null;
  const sortOrder = searchParams.get('order') || null;

  const getSortParams = (field: string) => {
    if (sortBy !== field) {
      return { sort: field, order: null };
    }

    if (sortBy === field && !sortOrder) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIconClassNames = (field: string) => {
    return classNames('fas', {
      'fa-sort': field !== sortBy || !sortOrder,
      'fa-sort-up': field === sortBy && !sortOrder,
      'fa-sort-down': field === sortBy && sortOrder === 'desc',
    });
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_ROWS_FOR_SORTING.map(th => (
            <th key={th}>
              <span className="is-flex is-flex-wrap-nowrap">
                {th}
                <SearchLink params={getSortParams(th.toLowerCase())}>
                  <span className="icon">
                    <i className={getSortIconClassNames(th.toLowerCase())} />
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
          <PersonRow key={person.slug} person={person} people={people} />
        ))}
      </tbody>
    </table>
  );
};
