import React from 'react';
import classNames from 'classnames';
import { useSearchParams, useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';
import { SortOrder } from '../../types/SortOrder';

interface Props {
  people: Person[];
  peopleFromServer: Person[] | null;
}

export const PeopleTable: React.FC<Props> = ({ people, peopleFromServer }) => {
  const [searchParams] = useSearchParams();
  const order = searchParams.get('order');
  const sort = searchParams.get('sort');
  const { personId } = useParams();

  const handleSortOrder = (column: string) => {
    let newOrder: SortOrder = 'asc';

    if (column.toLocaleLowerCase() === sort) {
      newOrder = order === 'asc' ? 'desc' : null;
    }

    return newOrder;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(item => {
            const normalizedItem = item.toLowerCase();
            const sortingByAsc = sort === normalizedItem && order === 'asc';
            const sortingByDesc = sort === normalizedItem && order === 'desc';

            return (
              <th
                key={item}
              >
                <span className="is-flex is-flex-wrap-nowrap">
                  {item}
                  <SearchLink
                    params={{
                      sort: handleSortOrder(item) ? item.toLowerCase() : null,
                      order: handleSortOrder(item),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas fa-sort', {
                          'fa-sort-up': sortingByAsc,
                          'fa-sort-down': sortingByDesc,
                        })}
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
        {people.map(person => {
          const {
            name,
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug,
          } = person;

          const findMother
            = peopleFromServer?.find(pers => pers.name === motherName);

          const findFather
            = peopleFromServer?.find(pers => pers.name === fatherName);

          return (
            <tr
              key={name}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === personId,
              })}
            >
              <td>
                <PersonLink
                  person={person}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {findMother
                  ? (
                    <PersonLink
                      person={findMother}
                    />
                  )
                  : motherName || '-'}
              </td>

              <td>
                {findFather
                  ? (
                    <PersonLink
                      person={findFather}
                    />
                  )
                  : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
