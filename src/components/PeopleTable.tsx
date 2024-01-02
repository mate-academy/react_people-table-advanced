import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { SortField } from '../types/SortField';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  isError: boolean;
};

export const PeopleTable: React.FC<Props> = ({ people, isError }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || SortField.ALL;
  const sortOrder = searchParams.get('order') || '';

  const handleSortParams = (field: SortField) => {

    if (sortField === field && !sortOrder) {
      return {
        sort: field,
        order: 'desc',
      };
    }

    if (sortField === field && sortOrder) {
      return {
        sort: null,
        order: null,
      };
    }

    return {
      sort: field,
      order: null,
    };
  };

  return (
    <>
      {!isError ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <SearchLink params={handleSortParams(SortField.NAME)}>
                    <span className="icon">
                      <i className={classNames('fas', {
                        'fa-sort': sortField !== SortField.NAME,
                        'fa-sort-up': sortField === SortField.NAME
                        && !sortOrder,
                        'fa-sort-down': sortField === SortField.NAME
                        && sortOrder,
                      })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink params={handleSortParams(SortField.SEX)}>
                    <span className="icon">
                      <i className={classNames('fas', {
                        'fa-sort': sortField !== SortField.SEX,
                        'fa-sort-up': sortField === SortField.SEX
                          && !sortOrder,
                        'fa-sort-down': sortField === SortField.SEX
                          && sortOrder,
                      })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink params={handleSortParams(SortField.BORN)}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sortField !== SortField.BORN,
                          'fa-sort-up': sortField === SortField.BORN
                            && !sortOrder,
                          'fa-sort-down': sortField === SortField.BORN
                            && sortOrder,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink params={handleSortParams(SortField.DIED)}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sortField !== SortField.DIED,
                          'fa-sort-up': sortField === SortField.DIED
                            && !sortOrder,
                          'fa-sort-down': sortField === SortField.DIED
                            && sortOrder,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map(person => (
              <PersonLink
                key={person.slug}
                person={{
                  ...person,
                  mother: people.find(p => p.name === person.motherName),
                  father: people.find(p => p.name === person.fatherName),
                }}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>There are no people matching the current search criteria</p>
      )}
    </>
  );
};
