/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  selectedPerson: Person | undefined;
  sortOrder: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson,
  sortOrder,
}) => {
  const getNextSortOrder = (currentOrder: string) => {
    switch (currentOrder) {
      case 'asc':
        return 'desc';
      case 'desc':
        return 'none';
      default:
        return 'asc';
    }
  };

  // const handleSort = (sortField: string) => {
  //   const nextOrder = ;

  //   return { sort: sortField, order: nextOrder };
  // };

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
              <SearchLink
                params={{
                  sort: 'name',
                  sortOrder: getNextSortOrder(sortOrder),
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  sort: 'sex',
                  sortOrder: getNextSortOrder(sortOrder),
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  sort: 'born',
                  sortOrder: getNextSortOrder(sortOrder),
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  sort: 'died',
                  sortOrder: getNextSortOrder(sortOrder),
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
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
            key={person.slug}
            data-cy="person"
            className={classNames('', {
              'has-background-warning': selectedPerson?.slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother && person.mother.slug ? (
                <PersonLink person={person.mother} />
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
