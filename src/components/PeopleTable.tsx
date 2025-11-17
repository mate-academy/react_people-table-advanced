import React, { useMemo } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const peopleMap = useMemo(() => {
    const map = new Map<string, Person>();

    for (const person of people) {
      map.set(person.name, person);
    }

    return map;
  }, [people]);

  const getNextSortParams = (field: string) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const renderSortIcon = (field: string) => {
    if (sort !== field) {
      return <i className="fas fa-sort" />;
    }

    if (order === 'desc') {
      return <i className="fas fa-sort-down" />;
    }

    return <i className="fas fa-sort-up" />;
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
              <SearchLink params={getNextSortParams('name')} className="ml-1">
                <span className="icon">{renderSortIcon('name')}</span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getNextSortParams('sex')} className="ml-1">
                <span className="icon">{renderSortIcon('sex')}</span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getNextSortParams('born')} className="ml-1">
                <span className="icon">{renderSortIcon('born')}</span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getNextSortParams('died')} className="ml-1">
                <span className="icon">{renderSortIcon('died')}</span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink name={person.name} peopleMap={peopleMap} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink name={person.motherName} peopleMap={peopleMap} />
            </td>
            <td>
              <PersonLink name={person.fatherName} peopleMap={peopleMap} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
