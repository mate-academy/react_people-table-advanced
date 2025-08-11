import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { FC } from 'react';
import { Person } from '../types';
import { useFilteredSortedPeople } from '../utils/useFiltered_SortedPeople';
import { NAME_OF_COLUMNS } from '../constants/nameofColumns';
import { SearchLink } from './SearchLink';

interface PeoopleTableProps {
  error: boolean;
  people: Person[];
  isLoading: boolean;
}

export const PeopleTable: FC<PeoopleTableProps> = ({
  error,
  people,
  isLoading,
}) => {
  const { slug } = useParams();
  const selectedPerson = slug;

  const { sortedPeople, order, typeSort } = useFilteredSortedPeople(people);

  const getSearchParams = (sortParam: string) => {
    if (sortParam === typeSort) {
      if (order === 'asc') {
        return { sort: sortParam, order: 'desc' };
      } else if (order === 'desc') {
        return { sort: null, order: null };
      } else {
        return { sort: sortParam, order: 'asc' };
      }
    }

    return { sort: sortParam, order: 'asc' };
  };

  return (
    <>
      <div>
        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!people.length && !isLoading && !error && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        <div className="box table-container">
          {sortedPeople.length ? (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {NAME_OF_COLUMNS.map(column => {
                    const name = column[0].toUpperCase() + column.slice(1);

                    return (
                      <th key={column}>
                        <span className="is-flex is-flex-wrap-nowrap">
                          {name}
                          <SearchLink params={getSearchParams(column)}>
                            <span className="icon">
                              <i
                                className={classNames('fas', {
                                  'fa-sort': typeSort !== column,
                                  'fa-sort-down':
                                    order === 'desc' && typeSort === column,
                                  'fa-sort-up':
                                    order === 'asc' && typeSort === column,
                                })}
                              />
                            </span>
                          </SearchLink>
                        </span>
                      </th>
                    );
                  })}

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">Mother</span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">Father</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedPeople.map(person => {
                  const getPerson = (personName: string | null) => {
                    const foundedPerson = people.find(
                      p => p.name === personName,
                    );

                    return foundedPerson ? foundedPerson : personName;
                  };

                  const createPerson = (
                    personName: string | null,
                    personSex: string | null,
                  ) => {
                    const human = getPerson(personName);

                    if (!human) {
                      return '-';
                    }

                    if (typeof human !== 'string') {
                      return (
                        <PersonLink
                          person={human}
                          isMother={personSex === 'f'}
                        />
                      );
                    }

                    return personName;
                  };

                  return (
                    <tr
                      data-cy="person"
                      key={person.slug}
                      className={classNames({
                        'has-background-warning':
                          selectedPerson === person.slug,
                      })}
                    >
                      <td>
                        <PersonLink
                          person={person}
                          isMother={person.sex === 'f'}
                        />
                      </td>
                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>

                      <td>{createPerson(person.motherName, 'f')}</td>
                      <td>{createPerson(person.fatherName, 'm')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <>There are no people matching the current search criteria</>
          )}
        </div>
      </div>
    </>
  );
};
