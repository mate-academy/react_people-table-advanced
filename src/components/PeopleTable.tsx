import classNames from 'classnames';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

const NOTHING = '-';

export const PeopleTable = (
  { people, filtredPeople }: { people: Person[], filtredPeople: Person[] },
) => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  const getSortParamsFromUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    const sort = searchParams.get('sort');
    const order = searchParams.get('order') || 'asc'; // Default order ascending

    return { sort, order };
  };

  const [sortParams, setSortParams] = useState(getSortParamsFromUrl);

  useEffect(() => {
    setSortParams(getSortParamsFromUrl());
  }, [location.search]);

  const sortedPeople = [...filtredPeople].sort((a, b) => {
    const { sort, order } = sortParams;

    if (sort === 'name') {
      return order === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

    if (sort === 'sex') {
      return order === 'asc'
        ? a.sex.localeCompare(b.sex)
        : b.sex.localeCompare(a.sex);
    }

    if (sort === 'born') {
      return order === 'asc' ? a.born - b.born : b.born - a.born;
    }

    if (sort === 'died') {
      return order === 'asc' ? a.died - b.died : b.died - a.died;
    }

    return 0;
  });

  const getSortLink = (sortType: string) => {
    const currentParams = new URLSearchParams(location.search);
    const currentSort = currentParams.get('sort');
    const currentOrder = currentParams.get('order');

    if (currentSort === sortType) {
      if (currentOrder === 'asc') {
        currentParams.set('order', 'desc');
      } else {
        currentParams.delete('sort');
        currentParams.delete('order');
      }
    } else {
      currentParams.set('sort', sortType);
      currentParams.set('order', 'asc');
    }

    return `/people?${currentParams.toString()}`;
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
              <Link
                to={getSortLink('name')}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortParams.sort !== 'name',
                    'fa-sort-up': sortParams.sort === 'name'
                      && sortParams.order === 'asc',
                    'fa-sort-down': sortParams.sort === 'name'
                      && sortParams.order === 'desc',
                  })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={getSortLink('sex')}>
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortParams.sort !== 'sex',
                    'fa-sort-up': sortParams.sort === 'sex'
                      && sortParams.order === 'asc',
                    'fa-sort-down': sortParams.sort === 'sex'
                      && sortParams.order === 'desc',
                  })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={getSortLink('born')}>
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortParams.sort !== 'born',
                    'fa-sort-up': sortParams.sort === 'born'
                      && sortParams.order === 'asc',
                    'fa-sort-down': sortParams.sort === 'born'
                      && sortParams.order === 'desc',
                  })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={getSortLink('died')}>
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortParams.sort !== 'died',
                    'fa-sort-up': sortParams.sort === 'died'
                      && sortParams.order === 'asc',
                    'fa-sort-down': sortParams.sort === 'died'
                      && sortParams.order === 'desc',
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
        {sortedPeople.map((person: Person) => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <Link
                to={{
                  pathname: `/people/${person.slug}`,
                  search: getSearchWith(new URLSearchParams(location.search), {
                    slug: new URLSearchParams(location.search).get('slug'),
                  }),
                }}
                className={classNames(
                  { 'has-text-danger': person.sex === 'f' },
                )}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName
                && people.some(man => man.name === person.motherName) ? (
                  <Link
                    to={{
                      pathname: `/people/${people.find(man => man.name === person.motherName)?.slug || ''}`,
                      search: getSearchWith(new
                      URLSearchParams(location.search), {
                        slug: new URLSearchParams(location.search).get('slug'),
                      }),
                    }}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </Link>
                ) : (
                  person.motherName || NOTHING
                )}
            </td>
            <td>
              {person.fatherName
                && people.some(man => man.name === person.fatherName) ? (
                  <Link
                    to={{
                      pathname: `/people/${people.find(man => man.name === person.fatherName)?.slug || ''}`,
                      search: getSearchWith(new
                      URLSearchParams(location.search), {
                        slug: new URLSearchParams(location.search).get('slug'),
                      }),
                    }}
                  >
                    {person.fatherName}
                  </Link>
                ) : (
                  person.fatherName || NOTHING
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
