import React from 'react';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { SortFilters } from '../../utils/filterHelpers';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  return (
    <>
      {!!people.length ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {Object.values(SortFilters).map(sortFilter => {
                const filterTitle =
                  sortFilter.charAt(0).toUpperCase() + sortFilter.slice(1);

                return (
                  <th key={sortFilter}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {filterTitle}
                      <SearchLink
                        params={{
                          sort:
                            sort === sortFilter && order === 'desc'
                              ? null
                              : sortFilter,
                          order:
                            sort === sortFilter
                              ? order === 'desc'
                                ? null
                                : 'desc'
                              : null,
                        }}
                      >
                        <span className="icon">
                          <i
                            className={cn(
                              'fas',
                              {
                                'fa-sort': sort !== sortFilter,
                              },
                              {
                                'fa-sort-up':
                                  sort === sortFilter && order !== 'desc',
                              },
                              {
                                'fa-sort-down':
                                  sort === sortFilter && order === 'desc',
                              },
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
              <tr
                data-cy="person"
                key={person.slug}
                className={cn({
                  'has-background-warning': slug === person.slug,
                })}
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <td>
                  {person.mother ? (
                    <PersonLink person={person.mother} />
                  ) : (
                    person.motherName || '-'
                  )}
                </td>

                <td>
                  {person.father ? (
                    <PersonLink person={person.father} />
                  ) : (
                    person.fatherName || '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>There are no people matching the current search criteria</p>
      )}
    </>
  );
};
