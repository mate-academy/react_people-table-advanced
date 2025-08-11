import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  searchParams: URLSearchParams;
  order: string | null;
  sort: string | null;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({
  people,
  searchParams,
  order,
  sort,
}) => {
  const { tabId } = useParams();
  const handleTo = (param: string) => {
    if (sort && order) {
      return {
        search: getSearchWith(searchParams, {
          sort: null,
          order: null,
        }),
      };
    }

    if (sort && sort === param) {
      return {
        search: getSearchWith(searchParams, {
          order: 'desc',
        }),
      };
    }

    return {
      search: getSearchWith(searchParams, {
        sort: param,
      }),
    };
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
              <Link to={handleTo('name')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': (!order && !sort) || sort !== 'name',
                      'fa-sort-up': sort && !order && sort === 'name',
                      'fa-sort-down': order && sort && sort === 'name',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={handleTo('sex')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': (!order && !sort) || sort !== 'sex',
                      'fa-sort-up': sort && !order && sort === 'sex',
                      'fa-sort-down': order && sort && sort === 'sex',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={handleTo('born')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': (!order && !sort) || sort !== 'born',
                      'fa-sort-up': sort && !order && sort === 'born',
                      'fa-sort-down': order && sort && sort === 'born',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={handleTo('died')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': (!order && !sort) || sort !== 'died',
                      'fa-sort-up': sort && !order && sort === 'died',
                      'fa-sort-down': order && sort && sort === 'died',
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
        {people.map(person => {
          const { name, sex, born, died, fatherName, motherName, slug } =
            person;

          const getParentLink = (parentName: string) => {
            return people.find(item => item.name === parentName);
          };

          const mother = motherName ? getParentLink(motherName) : null;
          const father = fatherName ? getParentLink(fatherName) : null;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': tabId === slug,
              })}
            >
              <td>
                <Link
                  to={`/people/${slug}`}
                  className={classNames({
                    'has-text-danger': sex === 'f',
                  })}
                >
                  {name}
                </Link>
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {mother ? (
                <td>
                  <Link
                    to={`/people/${mother.slug}`}
                    className="has-text-danger"
                  >
                    {motherName}
                  </Link>
                </td>
              ) : (
                <td>{motherName ? motherName : '-'}</td>
              )}
              {father ? (
                <td>
                  <Link to={`/people/${father.slug}`}>{fatherName}</Link>
                </td>
              ) : (
                <td>{fatherName ? fatherName : '-'}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
