/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types';
import cn from 'classnames';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
  selectedSlug?: string;
  sortBy: string | null;
  sortOrder: string | null;
}
export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  sortBy,
  sortOrder,
}) => {
  const getNextSortParams = (column: string) => {
    if (sortBy !== column) {
      return { sort: column, order: 'asc' };
    }

    if (sortOrder === 'asc') {
      return { sort: column, order: 'desc' };
    }

    if (sortOrder === 'desc') {
      return { sort: null, order: null };
    }

    return { sort: column, order: 'asc' };
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
              <SearchLink params={getNextSortParams('name')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort-up': sortBy === 'name' && sortOrder === 'asc',
                      'fa-sort-down': sortBy === 'name' && sortOrder === 'desc',
                      'fa-sort': sortBy !== 'name',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getNextSortParams('sex')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort-up': sortBy === 'sex' && sortOrder === 'asc',
                      'fa-sort-down': sortBy === 'sex' && sortOrder === 'desc',
                      'fa-sort': sortBy !== 'sex',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getNextSortParams('born')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort-up': sortBy === 'born' && sortOrder === 'asc',
                      'fa-sort-down': sortBy === 'born' && sortOrder === 'desc',
                      'fa-sort': sortBy !== 'born',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getNextSortParams('died')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort-up': sortBy === 'died' && sortOrder === 'asc',
                      'fa-sort-down': sortBy === 'died' && sortOrder === 'desc',
                      'fa-sort': sortBy !== 'died',
                    })}
                  />
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
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                people.find(p => p.name === person.motherName) ? (
                  <PersonLink
                    person={people.find(p => p.name === person.motherName)!}
                  />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                people.find(p => p.name === person.fatherName) ? (
                  <PersonLink
                    person={people.find(p => p.name === person.fatherName)!}
                  />
                ) : (
                  person.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
