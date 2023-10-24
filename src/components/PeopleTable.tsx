/* eslint-disable no-nested-ternary */
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const sortParams = [searchParams.get('sort'), searchParams.get('order')];

  const filtersData = ['Name', 'Sex', 'Born', 'Died'];

  return (
    <div className="block">
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {filtersData.map(sortingMethod => {
              const filterName = sortingMethod.toLowerCase();
              const isFilterAsc = sortParams.includes(filterName);
              const isFilterDesc = sortParams.includes('desc');

              return (
                <th key={sortingMethod}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {sortingMethod}
                    <SearchLink
                      params={
                        sortParams.every(param => param !== null) && isFilterAsc
                          ? { sort: null, order: null }
                          : isFilterAsc
                            ? { order: 'desc' }
                            : { sort: filterName, order: null }
                      }
                    >
                      <span className="icon">
                        <i className={classNames(
                          'fas',
                          { 'fa-sort': !isFilterAsc },
                          { 'fa-sort-up': isFilterAsc && !isFilterDesc },
                          { 'fa-sort-down': isFilterAsc && isFilterDesc },
                        )}
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
            <PersonLink
              key={person.slug}
              person={person}
              people={people}
              selectedPerson={personId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
