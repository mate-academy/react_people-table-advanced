/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink/SearchLink';

type Props = {
  people: Person[];
  selectedPerson: Person | undefined;
  sortOrder: string;
  searchParams: URLSearchParams;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson,
  sortOrder,
  searchParams,
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

  const getClassForIcon = (currentField: string) => {
    const sortField = searchParams.get('sort');

    if (currentField === sortField) {
      switch (sortOrder) {
        case 'asc':
          return 'fas fa-sort-up';
        case 'desc':
          return 'fas fa-sort-down';
        default:
          return 'fas fa-sort';
      }
    }

    return 'fas fa-sort';
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
              <SearchLink
                params={{
                  sort: 'name',
                  sortOrder: getNextSortOrder(sortOrder),
                }}
              >
                <span className="icon">
                  <i className={getClassForIcon('name')} />
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
                  <i className={getClassForIcon('sex')} />
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
                  <i className={getClassForIcon('born')} />
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
                  <i className={getClassForIcon('died')} />
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
