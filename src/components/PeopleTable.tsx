import { FC, useState } from 'react';
import { Person, SortColumns } from '../types';
import PersonLink from './PersonLink';
import classNames from 'classnames';
import { filterPeople } from '../utils/sortHelper';

type Props = {
  people: Person[];
};

const PeopleTable: FC<Props> = ({ people }) => {
  const [sortBy, setSortBy] = useState<SortColumns | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>('asc');

  const handleClickSort = (param: SortColumns) => {
    setSortBy(param);

    if (param === sortBy) {
      setSortOrder(prevOrder => {
        if (prevOrder === null) {
          return 'asc';
        }

        if (prevOrder === 'asc') {
          return 'desc';
        }

        return null;
      });
    } else {
      setSortOrder('asc');
    }
  };

  const preparedPeople = filterPeople(people, {
    sortBy,
    sortOrder,
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortColumns).map(column => (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column}
                <a
                  href="#/people?sort=name"
                  onClick={() => handleClickSort(column)}
                >
                  <span className="icon">
                    <i
                      data-cy="SortIcon"
                      className={classNames('fas', {
                        'fa-sort': sortBy !== column || !sortOrder,
                        'fa-sort-up': sortBy === column && sortOrder === 'asc',
                        'fa-sort-down':
                          sortBy === column && sortOrder === 'desc',
                      })}
                    />
                  </span>
                </a>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => (
          <PersonLink key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
