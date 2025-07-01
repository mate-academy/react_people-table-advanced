import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types/Person';
import { TableLinkHeaders } from '../types/TableLinkHeaders';
import { getNextSortParams } from '../utils/sortHelper';
import { PersonElement } from './PersonElement';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable = ({ people }: PeopleTableProps) => {
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(TableLinkHeaders).map(([key, value]) => {
            const nextParams = getNextSortParams(
              currentSort,
              currentOrder,
              key,
            );

            const isKeySelected = currentSort === key;
            const isOrderDesc = currentOrder === 'desc';

            return (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {value}
                  <SearchLink params={nextParams}>
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': !isKeySelected,
                          'fa-sort-up': isKeySelected && !isOrderDesc,
                          'fa-sort-down': isKeySelected && isOrderDesc,
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
        {people.map(person => (
          <PersonElement key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
