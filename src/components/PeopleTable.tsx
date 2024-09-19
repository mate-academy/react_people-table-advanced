import React from 'react';
import { PersonLink } from './PersonLink';
import { useGlobalState } from '../castomHuks/useGlobalState';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import { sortSearchParams } from '../utils/sortSearchParams';
import { Sorts } from '../types/Sorts';
import { handlerSortClasses } from '../utils/handlerSortClasses';

export const PeopleTable: React.FC = () => {
  const { sortAndFilterPeople } = useGlobalState();
  const [searchParams] = useSearchParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(Sorts).map(typeSort => (
            <th key={typeSort}>
              <span className="is-flex is-flex-wrap-nowrap">
                {typeSort.slice(0, 1).toUpperCase() + typeSort.slice(1)}
                <SearchLink params={sortSearchParams(typeSort, searchParams)}>
                  <span className="icon">
                    <i className={handlerSortClasses(typeSort, searchParams)} />
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
        {sortAndFilterPeople &&
          sortAndFilterPeople.map(person => (
            <PersonLink person={person} key={person.slug} />
          ))}
      </tbody>
    </table>
  );
};
