import { Fragment } from 'react/jsx-runtime';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SortTypes } from '../types/SortTypes';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order');

  const sortBy = (name: SortTypes) => {
    if (!sortParam || sortParam !== name) {
      setSearchParams({ sort: name });
    } else if (sortParam === name && !orderParam) {
      searchParams.set('order', 'desc');
      setSearchParams(searchParams);
    } else {
      setSearchParams('');
    }
  };

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
              <a onClick={() => sortBy(SortTypes.Name)}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      {
                        'fa-sort': sortParam !== SortTypes.Name,
                      },
                      {
                        'fa-sort-up':
                          sortParam === SortTypes.Name && orderParam !== 'desc',
                      },
                      {
                        'fa-sort-down':
                          sortParam === SortTypes.Name && orderParam === 'desc',
                      },
                    )}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => sortBy(SortTypes.Sex)}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      {
                        'fa-sort': sortParam !== SortTypes.Sex,
                      },
                      {
                        'fa-sort-up':
                          sortParam === SortTypes.Sex && orderParam !== 'desc',
                      },
                      {
                        'fa-sort-down':
                          sortParam === SortTypes.Sex && orderParam === 'desc',
                      },
                    )}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => sortBy(SortTypes.Born)}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      {
                        'fa-sort': sortParam !== SortTypes.Born,
                      },
                      {
                        'fa-sort-up':
                          sortParam === SortTypes.Born && orderParam !== 'desc',
                      },
                      {
                        'fa-sort-down':
                          sortParam === SortTypes.Born && orderParam === 'desc',
                      },
                    )}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => sortBy(SortTypes.Died)}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      {
                        'fa-sort': sortParam !== SortTypes.Died,
                      },
                      {
                        'fa-sort-up':
                          sortParam === SortTypes.Died && orderParam !== 'desc',
                      },
                      {
                        'fa-sort-down':
                          sortParam === SortTypes.Died && orderParam === 'desc',
                      },
                    )}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
            key={person.slug}
            data-cy="person"
          >
            <td>
              <Link
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
                to={`/people/${person.slug}`}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                <Fragment>
                  {person.mother ? (
                    <Link
                      className={classNames({
                        'has-text-danger': person.sex === 'f',
                      })}
                      to={`/people/${person.mother.slug}`}
                    >
                      {person.motherName}
                    </Link>
                  ) : (
                    <>{person.motherName}</>
                  )}
                </Fragment>
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <Fragment>
                  {person.father ? (
                    <Link
                      className={classNames({
                        'has-text-danger': person.sex === 'f',
                      })}
                      to={`/people/${person.father.slug}`}
                    >
                      {person.fatherName}
                    </Link>
                  ) : (
                    <>{person.fatherName}</>
                  )}
                </Fragment>
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
