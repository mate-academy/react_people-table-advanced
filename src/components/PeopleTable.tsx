/* eslint-disable jsx-a11y/control-has-associated-label */

import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchParamsTypes } from '../types/SearchParamsTypes';
import { SortTypes } from '../types/SortTypes';
import { FilterTypes } from '../types/FilterTypes';
import { SearchLink } from './SearchLink';
import cn from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const findPerson = (relativeName: string | null) => {
    return people.find(person => person.name === relativeName);
  };

  const [searchParams] = useSearchParams();
  const query = searchParams.get(SearchParamsTypes.query) || '';
  const centuries = searchParams.getAll(SearchParamsTypes.centuries || []);
  const sex = searchParams.get(SearchParamsTypes.sex) || FilterTypes.All;
  const sort = searchParams.get(SearchParamsTypes.sort) || null;
  const order = searchParams.get(SearchParamsTypes.order) || null;

  const filtredPeople = [...people].filter(person => {
    const filtredQuery = query.toLowerCase().trim();

    if (filtredQuery) {
      if (
        !person.name.toLowerCase().includes(filtredQuery) &&
        !person.fatherName?.toLowerCase().includes(filtredQuery) &&
        !person.motherName?.toLowerCase().includes(filtredQuery)
      ) {
        return false;
      }
    }

    if (
      centuries.length > 0 &&
      !centuries.includes(Math.ceil(person.born / 100).toString())
    ) {
      return false;
    }

    if (sex && person.sex !== sex) {
      return false;
    }

    return true;
  });

  filtredPeople.sort((a, b) => {
    switch (sort) {
      case SortTypes.Born:
        return a.born - b.born;
      case SortTypes.Died:
        return a.died - b.died;
      case SortTypes.Name:
        return a.name.localeCompare(b.name);
      case SortTypes.Sex:
        return a.sex.localeCompare(b.sex);
      default:
        return 0;
    }
  });

  if (order) {
    filtredPeople.reverse();
  }

  if (filtredPeople.length === 0) {
    return (
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <p>There are no people matching the current search criteria</p>
      </table>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortTypes).map(([key, value]) => (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink
                  params={{
                    sort: value === sort && order ? null : value,
                    order: value === sort && !order ? 'desc' : null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort-up': value === sort && !order,
                        'fa-sort-down': value === sort && order,
                        'fa-sort': value !== sort,
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
        {people.length > 0 &&
          filtredPeople.map(person => (
            <PersonLink
              key={person.slug}
              person={person}
              findPerson={findPerson}
            />
          ))}
      </tbody>
    </table>
  );
};
