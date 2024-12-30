/* eslint-disable jsx-a11y/control-has-associated-label */

import { useSearchParams } from 'react-router-dom';
import { PersonRow } from './PersonRow';
import { Person } from '../types';
import { Sorts } from '../types/SortsValue';
import { SearchLink } from './SearchLink';
import { handlerSortClasses, sortSearchParams } from '../utils/sortsParams';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(Sorts).map(sortKey => (
            <th key={sortKey}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortKey.charAt(0).toUpperCase() + sortKey.slice(1)}
                <SearchLink params={sortSearchParams(sortKey, searchParams)}>
                  <span className="icon">
                    <i className={handlerSortClasses(sortKey, searchParams)} />
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
          <PersonRow person={person} key={person.slug} people={people} />
        ))}
      </tbody>
    </table>
  );
};
