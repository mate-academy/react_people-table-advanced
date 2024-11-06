import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLinks } from './PersonLinks';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortIconClass = (field: string) => {
    if (sort !== field || !sort) {
      return 'fa-sort';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  const sortParams = (value: string) => {
    if (
      searchParams.has('sort') &&
      searchParams.has('order') &&
      value === sort
    ) {
      return { sort: null, order: null };
    }

    return sort === value
      ? { sort, order: 'desc' }
      : { sort: value, order: null };
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
              <SearchLink params={sortParams('name')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIconClass('name'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={sortParams('sex')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIconClass('sex'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={sortParams('born')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIconClass('born'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={sortParams('died')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIconClass('died'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person: Person) => {
          return (
            <PersonLinks person={person} key={person.slug} people={people} />
          );
        })}
      </tbody>
    </table>
  );
};
