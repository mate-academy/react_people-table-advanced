/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonItem } from '../PersonItem/PersonItem';
import { SearchLink } from '../SearchLink';
import { SortColumns } from '../../utils/SortColumns';
import { getSortOrder } from '../../utils/functions';
import { SortOrders } from '../../utils/SortOrders';

const sortingLinks = [
  { title: 'Name', value: SortColumns.NAME },
  { title: 'Sex', value: SortColumns.SEX },
  { title: 'Born', value: SortColumns.BORN },
  { title: 'Died', value: SortColumns.DIED },
];

interface Props {
  people: Person[],
}

export const People: React.FC<Props> = ({
  people,
}) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const findPerson = (name: string | null) => {
    if (!name) {
      return undefined;
    }

    return people.find(personItem => {
      return personItem.name === name;
    });
  };

  const handleOnSort = (sortColumn: SortColumns) => {
    let newSortOrder: SortOrders | null = SortOrders.DEFAULT;

    if (!sort || sort === sortColumn) {
      newSortOrder = getSortOrder(order as SortOrders);
    } else {
      newSortOrder = SortOrders.DESC;
    }

    return { sort: newSortOrder ? sortColumn : null, order: newSortOrder };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortingLinks.map(({ title, value }) => (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                <SearchLink
                  params={handleOnSort(
                    value,
                  )}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== value
                          || order === SortOrders.DEFAULT,
                        'fa-sort-up': sort === value
                        && order === SortOrders.DESC,
                        'fa-sort-down': sort === value
                        && order === SortOrders.ASC,
                      })}
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
          <PersonItem
            person={person}
            key={person.slug}
            findPerson={findPerson}
          />
        ))}
      </tbody>
    </table>
  );
};
