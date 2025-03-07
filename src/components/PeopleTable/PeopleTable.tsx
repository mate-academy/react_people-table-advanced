import {
  useSearchParams,
  Link,
  useParams,
  useLocation,
} from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';
import { Person } from '../../types';
import { Sex } from '../../types/Sex';
import { useCallback } from 'react';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const { person } = useParams();
  const { search } = useLocation();

  /* eslint-disable */
  const handleSearch = useCallback(
    (category: string) => {
      return {
        search: getSearchWith(
          searchParams,
          sort === category.toLocaleLowerCase() && order
            ? { sort: null, order: null }
            : {
                sort: category.toLocaleLowerCase(),
                order: sort === category.toLocaleLowerCase() ? 'desc' : null,
              },
        ),
      };
    },
    [sort, order],
  );
  /* eslint-enable */

  const getIconClassName = useCallback(
    (category: string) => {
      return classNames('fas', {
        'fa-sort': sort !== category.toLocaleLowerCase(),
        'fa-sort-up': sort === category.toLocaleLowerCase() && !order,
        'fa-sort-down': sort === category.toLocaleLowerCase() && order,
      });
    },
    [sort, order],
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(category => (
            <th key={category}>
              <span className="is-flex is-flex-wrap-nowrap">
                {category}
                <Link to={handleSearch(category)}>
                  <span className="icon">
                    <i className={getIconClassName(category)} />
                  </span>
                </Link>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(
          ({ name, sex, born, died, motherName, fatherName, slug }) => (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': slug === person,
              })}
            >
              <td>
                <Link
                  to={{
                    pathname: `./${slug}`,
                    search,
                  }}
                  className={classNames({
                    'has-text-danger': sex === Sex.female,
                  })}
                >
                  {name}
                </Link>
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {people.find(human => human.name === motherName) ? (
                  <Link
                    className="has-text-danger"
                    to={{
                      pathname: `./${
                        people.find(human => human.name === motherName)?.slug
                      }`,
                      search,
                    }}
                  >
                    {motherName}
                  </Link>
                ) : (
                  <p>{motherName || '-'}</p>
                )}
              </td>
              <td>
                {people.find(human => human.name === fatherName) ? (
                  <Link
                    to={{
                      pathname: `./${
                        people.find(human => human.name === fatherName)?.slug
                      }`,
                      search,
                    }}
                  >
                    {fatherName}
                  </Link>
                ) : (
                  <p>{fatherName || '-'}</p>
                )}
              </td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
};
