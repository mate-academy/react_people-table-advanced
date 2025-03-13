/* eslint-disable jsx-a11y/control-has-associated-label */

import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import PersonLink from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

const columns = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { selectedPerson } = useParams();
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';

  const getSortIcon = (field: string) => {
    if (currentSort !== field) {
      return 'fa-sort';
    }

    return currentOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  const getSortParams = (field: string) => {
    if (currentSort !== field) {
      return { sort: field, order: null };
    }

    if (!currentOrder) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <>
      {people.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {columns.map(colFiled => {
                const lowerColFiled = colFiled.toLowerCase();

                return (
                  <th key={colFiled}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {colFiled}
                      <SearchLink params={getSortParams(lowerColFiled)}>
                        <span className="icon">
                          <i className={`fas ${getSortIcon(lowerColFiled)}`} />
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
            {people.map((person: Person) => {
              return (
                <PersonLink
                  key={person.slug}
                  person={person}
                  people={people}
                  markedPerson={selectedPerson === person.slug}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
