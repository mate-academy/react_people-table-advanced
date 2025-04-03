/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams } from 'react-router-dom';
import { PersonItem } from './PersonItem';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const getSort = (key: string): { [key: string]: string | null } => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.get('sort') !== key) {
      if (newSearchParams.has('order')) {
        return { sort: key, order: null };
      }

      return { sort: key };
    } else if (
      newSearchParams.get('sort') === key &&
      !newSearchParams.has('order')
    ) {
      return { order: 'desc' };
    } else {
      return { sort: null, order: null };
    }
  };

  const getSortIconClass = (sortKey: string) => {
    const isSorted = searchParams.get('sort') === sortKey;
    const hasOrder = searchParams.has('order');

    return classNames('fas', {
      'fa-sort': !isSorted,
      'fa-sort-up': isSorted && !hasOrder,
      'fa-sort-down': isSorted && hasOrder,
    });
  };

  return (
    <>
      {people.length === 0 ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <SearchLink params={getSort('name')}>
                    <span className="icon">
                      <i className={getSortIconClass('name')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink params={getSort('sex')}>
                    <span className="icon">
                      <i className={getSortIconClass('sex')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink params={getSort('born')}>
                    <span className="icon">
                      <i className={getSortIconClass('born')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink params={getSort('died')}>
                    <span className="icon">
                      <i className={getSortIconClass('died')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map(person => (
              <PersonItem person={person} key={person.slug} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
