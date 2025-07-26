import { useContext } from 'react';
import { PeopleContext } from '../store/PeopleContext';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

export const PeopleTable = () => {
  const { people, sortOrder, sortType } = useContext(PeopleContext);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  function getSortLinkProps(newSortType: 'name' | 'sex' | 'born' | 'died') {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (sortType === newSortType) {
      if (sortOrder === 'asc') {
        newSearchParams.set('sort', newSortType);
        newSearchParams.set('order', 'desc');
      } else {
        newSearchParams.delete('sort');
        newSearchParams.delete('order');
      }
    } else {
      newSearchParams.set('sort', newSortType);
      newSearchParams.delete('order');
    }

    return {
      pathname,
      search: newSearchParams.toString(),
    };
  }

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
                <Link to={getSortLinkProps('name')}>
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
                </Link>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <Link to={getSortLinkProps('sex')}>
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
                </Link>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <Link to={getSortLinkProps('born')}>
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
                </Link>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <Link to={getSortLinkProps('died')}>
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
                </Link>
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
