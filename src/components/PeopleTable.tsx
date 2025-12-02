/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  allPeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people, allPeople }) => {
  const [checkedSlug, setCheckedSlug] = useState<string>('');

  const navigate = useNavigate();

  const { slug } = useParams();
  const { pathname, search } = useLocation();
  const params = new URLSearchParams(search);
  const [searchParams] = useSearchParams();
  const order = searchParams.get('order') === 'desc' ? 'desc' : null;
  const sort = searchParams.get('sort') || '';

  useEffect(() => {
    if (slug) {
      setCheckedSlug(slug);
    }
  }, [slug]);

  const handleSortPath = (sortName: string) => {
    if (sort === sortName && order === null) {
      return getSearchWith(searchParams, { sort: sortName, order: 'desc' });
    } else if (order !== null) {
      return getSearchWith(searchParams, { sort: null, order: null });
    } else {
      return getSearchWith(searchParams, { sort: sortName });
    }
  };

  const handleClass = (sortName: string) => {
    return classNames('fas ', {
      'fa-sort': sortName !== sort,
      'fa-sort-up': sortName === sort && order !== 'desc',
      'fa-sort-down': sortName === sort && order === 'desc',
    });
  };

  return (
    <>
      {people && people.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <Link
                    to={{
                      pathname: pathname,
                      search: `${handleSortPath('name')}`,
                    }}
                  >
                    <span className="icon">
                      <i className={handleClass('name')} />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <Link
                    to={{
                      pathname: pathname,
                      search: `${handleSortPath('sex')}`,
                    }}
                  >
                    <span className="icon">
                      <i className={handleClass('sex')} />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <Link
                    to={{
                      pathname: pathname,
                      search: `${handleSortPath('born')}`,
                    }}
                  >
                    <span className="icon">
                      <i className={handleClass('born')} />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <Link
                    to={{
                      pathname: pathname,
                      search: `${handleSortPath('died')}`,
                    }}
                  >
                    <span className="icon">
                      <i className={handleClass('died')} />
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
              const motherInList = allPeople.find(
                per => per.name === person.motherName,
              );
              const fatherInList = allPeople.find(
                per => per.name === person.fatherName,
              );

              const handleOnclick = (personSlug: string) => {
                navigate(`${personSlug}${search}`, { replace: true });
                setCheckedSlug(personSlug);
              };

              return (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={classNames({
                    'has-background-warning': checkedSlug === person.slug,
                  })}
                >
                  <td>
                    <Link
                      to={{
                        pathname: `/people/${person.slug}`,
                        search: params.toString(),
                      }}
                      onClick={() => handleOnclick(person.slug)}
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
                    {motherInList ? (
                      <PersonLink
                        parent={motherInList}
                        handleOnClick={handleOnclick}
                      />
                    ) : (
                      <span>{person.motherName ? person.motherName : '-'}</span>
                    )}
                  </td>
                  <td>
                    {fatherInList ? (
                      <PersonLink
                        parent={fatherInList}
                        handleOnClick={handleOnclick}
                      />
                    ) : (
                      <span>{person.fatherName ? person.fatherName : '-'}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
