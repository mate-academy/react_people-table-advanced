import { useLocation, useParams } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';
import { PersonLink } from '../UI/PersonLink';
import { useMemo } from 'react';
import { SortTypes } from '../types/SortTypes';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  sort: string;
  order: string | null;
  searchParams: URLSearchParams;
};
export const PeopleTable = ({ people, sort, order }: Props) => {
  const { userId } = useParams();
  const location = useLocation();

  const PeopleOnServer = useMemo(() => {
    return new Map(people.map(person => [person.name, person]));
  }, [people]);

  const hasPersonOnServer = (personName: string) => {
    const foundName = PeopleOnServer.get(personName);

    if (foundName) {
      return <PersonLink person={foundName} seacrh={location.search} />;
    }

    return personName;
  };

  const toggleSort = (sortName: SortTypes): SearchParams => {
    if (sort !== sortName) {
      return { sort: sortName, order: null };
    } else if (order !== null) {
      return { sort: null, order: null };
    } else {
      return { sort: sortName, order: 'desc' };
    }
  };

  const sortIconClass = (sortType: SortTypes) => {
    if (sortType !== sort) {
      return 'fa-sort';
    }

    if (order !== 'desc') {
      return 'fa-sort-up';
    }

    return 'fa-sort-down';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortTypes).map(([key, value]) => {
            return (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <SearchLink params={toggleSort(value)}>
                    <span className="icon">
                      <i className={`fas ${sortIconClass(value)}`} />
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
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({ 'has-background-warning': person.slug === userId })}
          >
            <td>
              <PersonLink person={person} seacrh={location.search} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? hasPersonOnServer(person.motherName) : '-'}
            </td>
            <td>
              {person.fatherName ? hasPersonOnServer(person.fatherName) : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
