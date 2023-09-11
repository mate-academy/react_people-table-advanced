import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { capitalize } from '../utils/capitalize';

type Props = {
  filteredPeople: Person[],
  sort: string,
  order: string,
};

const headerCells = ['name', 'sex', 'born', 'died'];

export const PeopleTable: React.FC<Props> = ({
  filteredPeople, sort, order,
}) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        {headerCells.map(cell => {
          const selectedCell = sort === cell;
          const isReversed = order === 'desc';

          return (
            <th key={cell}>
              <span className="is-flex is-flex-wrap-nowrap">
                {capitalize(cell)}
                <SearchLink
                  params={{
                    sort: selectedCell && isReversed
                      ? null
                      : cell,
                    order: selectedCell && !isReversed
                      ? 'desc'
                      : null,
                  }}
                >
                  <span className="icon">
                    <i className={cn('fas', {
                      'fa-sort': !selectedCell,
                      'fa-sort-up': selectedCell && !isReversed,
                      'fa-sort-down': selectedCell && isReversed,
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
      {filteredPeople.map(person => (
        <PersonLink
          key={person.slug}
          person={person}
          filteredPeople={filteredPeople}
        />
      ))}
    </tbody>
  </table>
);
