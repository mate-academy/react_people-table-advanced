import { useContext } from 'react';
import { PeopleContext } from '../../store/PeopleContext';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

export const PeopleTable = () => {
  const { people, sortOrder, sortType } = useContext(PeopleContext);
  const { pathname } = useLocation();

  return (
    <div>
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
                    sort:
                      sortType === 'name'
                        ? sortOrder === 'asc'
                          ? 'name'
                          : null
                        : 'name',
                    order:
                      sortType === 'name'
                        ? sortOrder === 'asc'
                          ? 'desc'
                          : null
                        : null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort-up':
                          sortType === 'name' && sortOrder === 'asc',
                        'fa-sort-down':
                          sortType === 'name' && sortOrder === 'desc',
                        'fa-sort': sortType !== 'name',
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
                    sort:
                      sortType === 'sex'
                        ? sortOrder === 'asc'
                          ? 'sex'
                          : null
                        : 'sex',
                    order:
                      sortType === 'sex'
                        ? sortOrder === 'asc'
                          ? 'desc'
                          : null
                        : null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort-up': sortType === 'sex' && sortOrder === 'asc',
                        'fa-sort-down':
                          sortType === 'sex' && sortOrder === 'desc',
                        'fa-sort': sortType !== 'sex',
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
                    sort:
                      sortType === 'born'
                        ? sortOrder === 'asc'
                          ? 'born'
                          : null
                        : 'born',
                    order:
                      sortType === 'born'
                        ? sortOrder === 'asc'
                          ? 'desc'
                          : null
                        : null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort-up':
                          sortType === 'born' && sortOrder === 'asc',
                        'fa-sort-down':
                          sortType === 'born' && sortOrder === 'desc',
                        'fa-sort': sortType !== 'born',
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
                    sort:
                      sortType === 'died'
                        ? sortOrder === 'asc'
                          ? 'died'
                          : null
                        : 'died',
                    order:
                      sortType === 'died'
                        ? sortOrder === 'asc'
                          ? 'desc'
                          : null
                        : null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort-up':
                          sortType === 'died' && sortOrder === 'asc',
                        'fa-sort-down':
                          sortType === 'died' && sortOrder === 'desc',
                        'fa-sort': sortType !== 'died',
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
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': pathname.endsWith(person.slug),
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  people.find(p => p.name === person.motherName) ? (
                    <PersonLink
                      person={people.find(p => p.name === person.motherName)!}
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
                  people.find(p => p.name === person.fatherName) ? (
                    <PersonLink
                      person={people.find(p => p.name === person.fatherName)!}
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
    </div>
  );
};
