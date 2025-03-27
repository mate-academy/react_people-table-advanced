import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import PersonItem from './PersonItem';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
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
                      <i
                        className={classNames('fas', {
                          'fa-sort': searchParams.get('sort') !== 'name',
                          'fa-sort-up':
                            searchParams.get('sort') === 'name' &&
                            !searchParams.has('order'),
                          'fa-sort-down':
                            searchParams.get('sort') === 'name' &&
                            searchParams.has('order'),
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink params={getSort('sex')}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': searchParams.get('sort') !== 'sex',
                          'fa-sort-up':
                            searchParams.get('sort') === 'sex' &&
                            !searchParams.has('order'),
                          'fa-sort-down':
                            searchParams.get('sort') === 'sex' &&
                            searchParams.has('order'),
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink params={getSort('born')}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': searchParams.get('sort') !== 'born',
                          'fa-sort-up':
                            searchParams.get('sort') === 'born' &&
                            !searchParams.has('order'),
                          'fa-sort-down':
                            searchParams.get('sort') === 'born' &&
                            searchParams.has('order'),
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink params={getSort('died')}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': searchParams.get('sort') !== 'died',
                          'fa-sort-up':
                            searchParams.get('sort') === 'died' &&
                            !searchParams.has('order'),
                          'fa-sort-down':
                            searchParams.get('sort') === 'died' &&
                            searchParams.has('order'),
                        })}
                      />
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
