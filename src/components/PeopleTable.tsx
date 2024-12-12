import { FC } from 'react';
import { Person } from '../types/Person';
import { SortColumns } from '../types/Filter';
import classNames from 'classnames';
import { filterPeople } from '../utils/sortHelper';
import { SearchLink } from './SearchLink';
import PersonRow from './PersonRow';

type Props = {
  people: Person[];
  query: string;
  sex: string;
  centuries: number[];
  sortBy: string | null;
  sortOrder: string | null;
};

const PeopleTable: FC<Props> = ({
  people,
  query,
  sex,
  centuries,
  sortBy,
  sortOrder,
}) => {
  const preparedPeople = filterPeople(people, {
    sortBy,
    sortOrder,
    query,
    sex,
    centuries,
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
                <SearchLink
                  params={
                    sortBy === column && sortOrder === 'asc'
                      ? { sortBy: column, sortOrder: 'desc' }
                      : { sortBy: column, sortOrder: 'asc' }
                  }
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
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => (
          <PersonRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
