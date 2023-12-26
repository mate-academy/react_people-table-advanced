import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getLinkClass = (param: string) => cn(
    'fas',
    { 'fa-sort': param !== sort },
    { 'fa-sort-up': sort && sort === param && !order },
    { 'fa-sort-down': sort && sort === param && order === 'desc' },
  );

  const getLinkParams = (
    param: string,
  ):
  | { sort: string }
  | {
    sort: null;
    order: null;
  }
  | { order: string } => {
    if (!sort) {
      return { sort: param };
    }

    if (sort === param) {
      return order ? { sort: null, order: null } : { order: 'desc' };
    }

    return { sort: param };
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
              <SearchLink params={getLinkParams('name')}>
                <span className="icon">
                  <i className={getLinkClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getLinkParams('sex')}>
                <span className="icon">
                  <i className={getLinkClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getLinkParams('born')}>
                <span className="icon">
                  <i className={getLinkClass('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getLinkParams('died')}>
                <span className="icon">
                  <i className={getLinkClass('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.length !== 0
          && people.map((person) => (
            <PersonLink
              key={people.indexOf(person)}
              person={person}
              people={people}
            />
          ))}
      </tbody>
    </table>
  );
};
