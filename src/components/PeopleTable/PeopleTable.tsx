/* eslint-disable no-console */
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { PeopleItem } from '../PeopleItem/PeopleItem';
import { Person } from '../../types/Person';
import { SearchLink } from '../SearchLink/SearchLink';

export type Props = {
  peoples: Person[],
};

const tableSortHeaders = [
  'Name',
  'Sex',
  'Born',
  'Died',
];

export const PeopleTable = ({ peoples }: Props) => {
  const [searchParameters] = useSearchParams();

  const sort = searchParameters.get('sort') || '';
  const order = searchParameters.get('order') || '';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableSortHeaders.map((header) => (
            <th key={header}>
              <span className="is-flex is-flex-wrap-nowrap">
                {header}
                {(!sort || sort !== header.toLowerCase()) && (
                  <SearchLink
                    params={{
                      sort: header.toLowerCase(),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas fa-sort')}
                      />
                    </span>
                  </SearchLink>
                )}
                {sort === header.toLowerCase() && !order && (
                  <SearchLink
                    params={{
                      sort: header.toLowerCase(),
                      order: 'desc',
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas fa-sort-up')}
                      />
                    </span>
                  </SearchLink>
                )}
                {(order && sort === header.toLowerCase()) && (
                  <SearchLink
                    params={{
                      sort: null,
                      order: null,
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas fa-sort-down')}
                      />
                    </span>
                  </SearchLink>
                )}
              </span>
            </th>
          ))}
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Mother
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Father
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        {peoples.map((user) => (
          <PeopleItem person={user} key={user.slug} />
        ))}
      </tbody>
    </table>
  );
};
