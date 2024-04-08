import React from 'react';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import PersonLink from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  filteredPeople: Person[];
  getSortIcon: (sorted: string) => string;
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({
  filteredPeople,
  getSortIcon,
  people,
}) => {
  const [searchParams] = useSearchParams();
  const { personId } = useParams();

  const sort = searchParams.get('sort');
  const reversed = searchParams.get('reversed');

  const clikButtonsSort = (sorted: string) => {
    if (sort === sorted && reversed) {
      return { sort: null, reversed: null };
    }

    if (sort === sorted) {
      return { sort: sorted, reversed: 'true' };
    }

    return { sort: sorted, reversed: null };
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
              <SearchLink params={clikButtonsSort('name')}>
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={clikButtonsSort('sex')}>
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={clikButtonsSort('born')}>
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={clikButtonsSort('died')}>
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => {
          const mother = people.find(m => m.name === person.motherName);
          const father = people.find(f => f.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': personId === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
