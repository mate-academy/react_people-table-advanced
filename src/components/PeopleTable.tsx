import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  visibleUsers: Person[] | null;
  sort: string;
  order: string;
};

export const PeopleTable:React.FC<Props> = ({ visibleUsers, sort, order }) => {
  return (
    <>
      {visibleUsers && visibleUsers.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <SearchLink
                    params={{
                      sort: sort === 'name' && order ? null : 'name',
                      order: sort === 'name' && !order ? 'desc' : null,
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas', {
                            'fa-sort': sort !== 'name',
                            'fa-sort-up': sort === 'name' && !order,
                            'fa-sort-down': sort === 'name' && order,
                          },
                        )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink
                    params={{
                      sort: sort === 'sex' && order ? null : 'sex',
                      order: sort === 'sex' && !order ? 'desc' : null,
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas', {
                            'fa-sort': sort !== 'sex',
                            'fa-sort-up': sort === 'sex' && !order,
                            'fa-sort-down': sort === 'sex' && order,
                          },
                        )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink
                    params={{
                      sort: sort === 'born' && order ? null : 'born',
                      order: sort === 'born' && !order ? 'desc' : null,
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas', {
                            'fa-sort': sort !== 'born',
                            'fa-sort-up': sort === 'born' && !order,
                            'fa-sort-down': sort === 'born' && order,
                          },
                        )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink
                    params={{
                      sort: sort === 'died' && order ? null : 'died',
                      order: sort === 'died' && !order ? 'desc' : null,
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas', {
                            'fa-sort': sort !== 'died',
                            'fa-sort-up': sort === 'died' && !order,
                            'fa-sort-down': sort === 'died' && order,
                          },
                        )}
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
            {visibleUsers.map((user) => (
              <PersonLink user={user} key={user.slug} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
