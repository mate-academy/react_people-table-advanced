/* eslint-disable jsx-a11y/control-has-associated-label */

import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
}

const sortFields = ['name', 'sex', 'born', 'died'];

const getFilteredPeople = (
  people: Person[],
  query: string,
  sex: string,
  centuries: string[],
  sort: string,
  order: string,
) => {
  let visiblePeople = [...people];

  if (query) {
    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query),
    );
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    visiblePeople = visiblePeople.filter(person =>
      centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (sort) {
    visiblePeople.sort((a, b) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]);
        case 'born':
        case 'died':
          return a[sort] - b[sort];
        default:
          return 0;
      }
    });
  }

  if (order) {
    visiblePeople.reverse();
  }

  return visiblePeople;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.trim().toLowerCase() || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const visiblePeople = getFilteredPeople(
    people,
    query,
    sex,
    centuries,
    sort,
    order,
  );

  const getIconClass = (sortParam: string) =>
    classNames('fas', {
      'fa-sort': sort !== sortParam,
      'fa-sort-up': sort === sortParam && !order,
      'fa-sort-down': sort === sortParam && !!order,
    });

  if (visiblePeople.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {sortFields.map(field => (
              <th key={field}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {field.replace(/^./, field[0].toUpperCase())}
                  <SearchLink
                    params={{
                      sort: !order || sort !== field ? field : null,
                      order: !order && sort === field ? 'desc' : null,
                    }}
                  >
                    <span className="icon">
                      <i className={getIconClass(field)} />
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
          {visiblePeople.map(person => (
            <PersonItem person={person} key={person.slug} />
          ))}
        </tbody>
      </table>
    </table>
  );
};
