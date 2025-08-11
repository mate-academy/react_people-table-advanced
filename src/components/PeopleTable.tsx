import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  peopleList: Person[];
};
export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  const { personId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const order = searchParams.get('order');
  const sort = searchParams.get('sort');

  type Sort = 'name' | 'sex' | 'born' | 'died';

  function toggleSort(sortParam: Sort) {
    setSearchParams(prevSearch => {
      const params = new URLSearchParams(prevSearch);

      // const sort = params.get('sort');
      // const order = params.get('order');

      if (sort !== sortParam) {
        params.set('sort', sortParam);
        params.delete('order');

        return params;
      }

      if (sort === sortParam && !order) {
        params.set('order', 'desc');

        return params;
      }

      if (sort === sortParam && order === 'desc') {
        params.delete('order');
        params.delete('sort');

        return params;
      }

      // params.set('sort', sortParam);
      return params;
    });
  }

  return (
    <table
      data-cy="peopleTable"
      className="table 
    is-striped 
    is-hoverable 
    is-narrow 
    is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              {/* <Link to="#/people?sort=name"> */}
              <Link
                to=""
                onClick={event => {
                  event.preventDefault();
                  toggleSort('name');
                }}
              >
                <span className="icon">
                  {/* <i className="fas fa-sort" /> */}
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && !order,
                      'fa-sort-down': order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to=""
                onClick={event => {
                  event.preventDefault();
                  toggleSort('sex');
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && !order,
                      'fa-sort-down': order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to=""
                onClick={event => {
                  event.preventDefault();
                  toggleSort('born');
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && !order,
                      'fa-sort-down': order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to=""
                onClick={event => {
                  event.preventDefault();
                  toggleSort('died');
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && !order,
                      'fa-sort-down': order === 'desc',
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
        {peopleList.map(person => (
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning': personId === person.slug,
            })}
            key={person.slug}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {!person.motherName ? (
                '-'
              ) : person.mother === undefined ? (
                person.motherName
              ) : (
                <Link
                  className="has-text-danger"
                  to={`/people/${person.mother.slug}`}
                >
                  {person.mother.name}
                </Link>
              )}
            </td>
            <td>
              {!person.fatherName ? (
                '-'
              ) : person.father === undefined ? (
                person.fatherName
              ) : (
                <Link to={`/people/${person.father.slug}`}>
                  {person.father.name}
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
