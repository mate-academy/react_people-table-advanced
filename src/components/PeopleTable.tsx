import { usePeopleContext } from '../context/PeopleContext';
import { PersonItemLink } from './PersonItemLink';
import { SortBy, SortOrder } from '../types';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const { filteredPeople, people } = usePeopleContext();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.trim().toLowerCase() || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getIconClass = (sortParam: string) =>
    classNames('fas', {
      'fa-sort': sort !== sortParam,
      'fa-sort-up': sort === sortParam && !order,
      'fa-sort-down': sort === sortParam && !!order,
    });

  const filterPeople = filteredPeople(
    people,
    query,
    sex,
    centuries,
    sort,
    order,
  );

  if (filterPeople.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortBy).map((filter, index) => {
            return (
              <th key={index}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {filter.replace(/^./, filter[0].toUpperCase())}
                  <SearchLink
                    params={{
                      sort: !order || sort !== filter ? filter : null,
                      order: !order && sort === filter ? SortOrder.Desc : null,
                    }}
                  >
                    <span className="icon">
                      <i className={getIconClass(filter)} />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filterPeople.map(person => (
          <PersonItemLink key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
