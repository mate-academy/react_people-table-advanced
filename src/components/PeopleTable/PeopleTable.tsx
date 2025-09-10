/* eslint-disable jsx-a11y/control-has-associated-label */

import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';
import classNames from 'classnames';
import { sortPeople } from '../../utils/sortPeople';
import { useMemo } from 'react';
import { filterPeople } from '../../utils/filterPeople';
import { FiltersParams } from '../../types/FilterParams';

type Props = {
  people: Person[];
};
export const PeopleTable = ({ people }: Props) => {
  const [params] = useSearchParams();
  const { personId } = useParams();
  const orderFilter = params.get('order');
  const sexFilter = params.get('sex');
  const query = params.get('query');
  const centuryFilter = params.getAll('century');
  const sortFilter = params.get('sort');

  const visibleData = useMemo(() => {
    const filters: FiltersParams = {
      sex: sexFilter,
      centuries: centuryFilter,
      query,
    };
    const filteredPeople = filterPeople(people, filters);

    return sortPeople(sortFilter, orderFilter, filteredPeople);
  }, [centuryFilter, orderFilter, people, query, sexFilter, sortFilter]);

  function setOrder(type: string) {
    const sort = params.get('sort');

    if (sort && sort === type && !orderFilter) {
      return { sort, order: 'desc' };
    } else if (sort && sort === type && orderFilter) {
      return { sort: null, order: null };
    }

    return { sort: type, order: null };
  }

  function getIcon(type: string) {
    const sort = params.get('sort');

    if (sort && sort === type && !orderFilter) {
      return 'fas fa-sort-up';
    } else if (sort && sort === type && orderFilter) {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort';
  }

  return (
    <>
      {visibleData.length === 0 && (
        <p data-cy="noPeopleMessage">
          There are no people matching the current search criteria
        </p>
      )}
      {visibleData.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <SearchLink params={setOrder('name')}>
                    <span className="icon">
                      <i className={getIcon('name')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink params={setOrder('sex')}>
                    <span className="icon">
                      <i className={getIcon('sex')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink params={setOrder('born')}>
                    <span className="icon">
                      <i className={getIcon('born')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink params={setOrder('died')}>
                    <span className="icon">
                      <i className={getIcon('died')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map(person => (
              <tr
                key={person.slug}
                data-cy="person"
                className={classNames({
                  'has-background-warning': person.slug === personId,
                })}
              >
                <td>
                  <PersonLink
                    person={{
                      name: person.name,
                      sex: person.sex,
                      slug: person.slug,
                    }}
                  />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.motherName ? (
                    person.mother ? (
                      <PersonLink
                        person={{
                          name: person.motherName,
                          sex: 'f',
                          slug: person.mother?.slug,
                        }}
                      />
                    ) : (
                      person.motherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {person.fatherName ? (
                    person.father ? (
                      <PersonLink
                        person={{
                          name: person.fatherName,
                          sex: 'm',
                          slug: person.father?.slug,
                        }}
                      />
                    ) : (
                      person.fatherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
