import classNames from 'classnames';
import React, { useMemo } from 'react';

import { useLocation, useSearchParams } from 'react-router-dom';
import { PersonRow } from './PersonRow';
import { FilterButton } from './FilterButton';

type Props = {
  people: Person[];
  slug: string | undefined;
};

export const PeopleTable: React.FC<Props> = React.memo(
  ({ people, slug }) => {
    const { search } = useLocation();
    const [searchParams] = useSearchParams(search);

    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder');

    const visiblePeople = useMemo(() => {
      if (sortBy) {
        return people.sort((a, b) => {
          switch (sortBy) {
            case 'name':
            case 'sex':
              return sortOrder === 'asc'
                ? a[sortBy].localeCompare(b[sortBy])
                : b[sortBy].localeCompare(a[sortBy]);
            case 'born':
            case 'died':
              return sortOrder === 'asc'
                ? a[sortBy] - b[sortBy]
                : b[sortBy] - a[sortBy];
            default: return 0;
          }
        });
      }

      return people;
    }, [sortBy, sortOrder, people]);

    return (
      <div className="wrapper">
        <div className="box">
          <table className="PeopleTable
      table is-hoverable is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <FilterButton
                    text="Name"
                    sortParam="name"
                  />
                </th>
                <th>
                  <FilterButton
                    text="Sex"
                    sortParam="sex"
                  />
                </th>
                <th>
                  <FilterButton
                    text="Born"
                    sortParam="born"
                  />
                </th>
                <th>
                  <FilterButton
                    text="Died"
                    sortParam="died"
                  />
                </th>
                <th><p className="text-wrapper">Mother</p></th>
                <th><p className="text-wrapper">Father</p></th>
              </tr>
            </thead>
            <tbody>
              {visiblePeople.map((person) => (
                <tr
                  key={person.slug}
                  className={classNames(
                    { 'is-selected': person.slug === slug },
                  )}
                >
                  <PersonRow person={person} sortBy={sortBy} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    );
  },
);
