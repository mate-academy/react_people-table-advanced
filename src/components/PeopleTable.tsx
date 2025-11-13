/* eslint-disable jsx-a11y/control-has-associated-label */

import { useMemo } from 'react';
import { Person } from '../types';
import cn from 'classnames';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const byName = useMemo(
    () => new Map(people.map(p => [p.name, p] as const)),
    [people],
  );

  const [searchParams] = useSearchParams();
  const sort = (searchParams.get('sort') as SortField | null) || null;
  const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

  const getNewSortParams = (field: SortField) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (sort === field && order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const sortIcon = (field: SortField) => {
    if (sort !== field) {
      return <i className="fas fa-sort" />;
    }

    if (order === 'desc') {
      return <i className="fas fa-sort-down" />;
    } // ↓

    return <i className="fas fa-sort-up" />; // ↑
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
              <SearchLink params={getNewSortParams('name')}>
                <span className="icon">{sortIcon('name')}</span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getNewSortParams('sex')}>
                <span className="icon">{sortIcon('sex')}</span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getNewSortParams('born')}>
                <span className="icon">{sortIcon('born')}</span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getNewSortParams('died')}>
                <span className="icon">{sortIcon('died')}</span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = person.slug === selectedSlug;

          const motherName = person.motherName?.trim();
          const fatherName = person.fatherName?.trim();

          const mother = motherName ? byName.get(motherName) : undefined;
          const father = fatherName ? byName.get(fatherName) : undefined;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {!motherName ? (
                  '-'
                ) : mother ? (
                  <PersonLink person={mother} />
                ) : (
                  motherName
                )}
              </td>
              <td>
                {!fatherName ? (
                  '-'
                ) : father ? (
                  <PersonLink person={father} />
                ) : (
                  fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
