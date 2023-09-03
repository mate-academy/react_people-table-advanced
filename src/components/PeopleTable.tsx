import { useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Sort, PeopleContext } from './Context';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleTable = () => {
  const { preperedPeople } = useContext(PeopleContext);

  const [searchParams] = useSearchParams();

  const getSort = searchParams.get('sort');
  const getOrder = searchParams.get('order');

  const handleClick = (sort: Sort) => {
    if (!getSort && !getOrder) {
      return getSearchWith(searchParams, { sort });
    }

    if (getSort && !getOrder) {
      return getSearchWith(searchParams, { sort: getSort, order: 'desc' });
    }

    return getSearchWith(searchParams, { sort: null, order: null });
  };

  const getLinkClass = (value: string) => {
    return classNames('fas', {
      'fa-sort': !getSort || getSort !== value,
      'fa-sort-up': getSort === value && !getOrder,
      'fa-sort-down': getSort === value && getOrder,
    });
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
                to={{ search: handleClick(Sort.name) }}
              >
                <span className="icon">
                  <i className={getLinkClass(Sort.name)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: handleClick(Sort.sex) }}>
                <span className="icon">
                  <i className={getLinkClass(Sort.sex)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: handleClick(Sort.born) }}>
                <span className="icon">
                  <i className={getLinkClass(Sort.born)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: handleClick(Sort.died) }}>
                <span className="icon">
                  <i className={getLinkClass(Sort.died)} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preperedPeople.map((person) => {
          return <PersonLink person={person} key={person.name} />;
        })}
      </tbody>
    </table>
  );
};
