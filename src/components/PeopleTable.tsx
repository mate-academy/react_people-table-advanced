/* eslint-disable jsx-a11y/control-has-associated-label */

import { useSearchParams } from 'react-router-dom';
import { getPreparedPeople } from '../helpers/getPreparedPeople';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { SortType } from '../types/SortType';
import { SearchParamKeys } from '../types/SearchParamKeys';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(SearchParamKeys.SORT) as SortType | null;
  const order = searchParams.get(
    SearchParamKeys.ORDER,
  ) as SearchParamKeys.DESC | null;
  const preparedPeople = getPreparedPeople(people, searchParams);
  const query = searchParams.get(SearchParamKeys.QUERY) || '';

  if (!preparedPeople.length && !!query) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortType).map(([key, value]) => (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink
                  params={{
                    sort: sort === value && order ? null : value,
                    order:
                      sort === value && !order ? SearchParamKeys.DESC : null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== value,
                        'fa-sort-up': !order && sort === value,
                        'fa-sort-down': order && sort === value,
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map((person: Person) => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
