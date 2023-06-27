import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonProperties } from './PersonProperties';
import { getFiltredPeople } from '../utils/getFiltredPeople';
import { SearchLink } from './SearchLink';
import { getSortedPeople } from '../utils/getSortedPeople';

type Props = {
  people: Person[],
  selectPeopleSlug: string | null,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectPeopleSlug,
}) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = useMemo(() => {
    return getFiltredPeople(people, searchParams);
  }, [people, query, sex, centuries]);

  const sortedPeople = useMemo(() => {
    return getSortedPeople(filteredPeople, searchParams);
  }, [sort, order, filteredPeople]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <span className="icon">
                <SearchLink
                  params={{
                    sort: 'name' && order ? null : 'name',
                    order: sort === 'name' && !order ? 'desc' : null,
                  }}
                  className={classNames(
                    'fas',
                    'fa-sort',
                    {
                      'fa-sort-up': sort === 'name' && !order,
                      'fa-sort-down': sort === 'name' && order,
                    },
                  )}
                />
              </span>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex

              <span className="icon">
                <SearchLink
                  params={{
                    sort: 'sex' && order ? null : 'sex',
                    order: sort === 'sex' && !order ? 'desc' : null,
                  }}
                  className={classNames(
                    'fas',
                    'fa-sort',
                    {
                      'fa-sort-up': sort === 'sex' && !order,
                      'fa-sort-down': sort === 'sex' && order,
                    },
                  )}
                />
              </span>

            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born

              <span className="icon">
                <SearchLink
                  params={{
                    sort: 'born' && order ? null : 'born',
                    order: sort === 'born' && !order ? 'desc' : null,
                  }}
                  className={classNames(
                    'fas',
                    'fa-sort',
                    {
                      'fa-sort-up': sort === 'born' && !order,
                      'fa-sort-down': sort === 'born' && order,
                    },
                  )}
                />
              </span>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died

              <span className="icon">
                <SearchLink
                  params={{
                    sort: 'died' && order ? null : 'died',
                    order: sort === 'died' && !order ? 'desc' : null,
                  }}
                  className={classNames(
                    'fas',
                    'fa-sort',
                    {
                      'fa-sort-up': sort === 'died' && !order,
                      'fa-sort-down': sort === 'died' && order,
                    },
                  )}
                />
              </span>

            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <PersonProperties
            person={person}
            key={person.slug}
            selectPeopleSlug={selectPeopleSlug}
            people={sortedPeople}
          />
        ))}
      </tbody>
    </table>
  );
};
