/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { useMemo } from 'react';
import classNames from 'classnames';

type Props = {
  people: Person[];
};
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const location = useLocation();
  const currentParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const newParams = (field: string): SearchParams => {
    if (!currentParams.get('sort') || currentParams.get('sort') !== field) {
      return {
        sort: field,
        order: null,
      };
    }

    if (!currentParams.get('order')) {
      return {
        sort: field,
        order: 'desc',
      };
    } else {
      return {
        sort: null,
        order: null,
      };
    }
  };

  const sortButtonStyles = (field: string) => {
    return {
      'fa-sort': currentParams.get('sort') !== field,
      'fa-sort-down':
        currentParams.get('sort') === field && !!currentParams.get('order'),
      'fa-sort-up':
        currentParams.get('sort') === field && !currentParams.get('order'),
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
              <Link
                to={{
                  pathname: '/people',
                  search: getSearchWith(currentParams, newParams('name')),
                }}
              >
                <span className="icon">
                  <i className={classNames('fas', sortButtonStyles('name'))} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  pathname: '/people',
                  search: getSearchWith(currentParams, newParams('sex')),
                }}
              >
                <span className="icon">
                  <i className={classNames('fas', sortButtonStyles('sex'))} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  pathname: '/people',
                  search: getSearchWith(currentParams, newParams('born')),
                }}
              >
                <span className="icon">
                  <i className={classNames('fas', sortButtonStyles('born'))} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  pathname: '/people',
                  search: getSearchWith(currentParams, newParams('died')),
                }}
              >
                <span className="icon">
                  <i className={classNames('fas', sortButtonStyles('died'))} />
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
          <PersonLink person={person} key={person.name} />
        ))}
      </tbody>
    </table>
  );
};
