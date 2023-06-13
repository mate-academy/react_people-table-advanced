import classNames from 'classnames';
import { PersonalLink } from './PersonalLink';
import { usePeopleContext } from '../context.ts/PeopleContext';
import { SearchLink } from './SearchLink';

export const PeopleTable = () => {
  const {
    filteredPeople, people, handleClickSort, order, sortField,
  } = usePeopleContext();

  if (!filteredPeople.length && people.length) {
    return (<p>There are no people matching the current search criteria</p>);
  }

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
              <SearchLink
                params={{
                  sort: 'name',
                  order: order === 'asc' ? 'desc' : null,
                }}
                onClick={() => handleClickSort('name')}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fas fa-sort-down': sortField === 'name' && order === 'asc',
                    'fas fa-sort-up': sortField === 'name' && order === 'desc',
                  })}
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
                  sort: 'sex',
                  order: order === 'asc' ? 'desc' : null,
                }}
                onClick={() => handleClickSort('sex')}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fas fa-sort-down': sortField === 'sex' && order === 'asc',
                    'fas fa-sort-up': sortField === 'sex' && order === 'desc',
                  })}
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
                  sort: 'born',
                  order: order === 'asc' ? 'desc' : null,
                }}
                onClick={() => handleClickSort('born')}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fas fa-sort-down': sortField === 'born' && order === 'asc',
                    'fas fa-sort-up': sortField === 'born' && order === 'desc',
                  })}
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
                  sort: 'died',
                  order: order === 'asc' ? 'desc' : null,
                }}
                onClick={() => handleClickSort('died')}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fas fa-sort-down': sortField === 'died' && order === 'asc',
                    'fas fa-sort-up': sortField === 'died' && order === 'desc',
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
        {filteredPeople.map(person => (
          <PersonalLink
            person={person}
            key={person.slug}
          />
        ))}

      </tbody>
    </table>
  );
};
