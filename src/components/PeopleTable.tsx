/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useSearchParams } from 'react-router-dom';
import type { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper'; // Перевір шлях до утиліти

interface PeopleTableProps {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable = ({ people, selectedSlug }: PeopleTableProps) => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const getSortSearchString = (field: string) => {
    const paramsToUpdate: Record<string, string | null> = {};

    if (sortBy !== field) {
      paramsToUpdate.sort = field;
      paramsToUpdate.order = 'asc';
    } else if (sortOrder === 'asc') {
      paramsToUpdate.order = 'desc';
    } else {
      paramsToUpdate.sort = null;
      paramsToUpdate.order = null;
    }

    return getSearchWith(searchParams, paramsToUpdate);
  };

  const sortPeople = (data: Person[]): Person[] => {
    if (!sortBy || !sortOrder) {
      return data;
    }

    const newPeople = [...data];

    return newPeople.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'sex':
          comparison = a.sex.localeCompare(b.sex);
          break;
        case 'born':
          comparison = a.born - b.born;
          break;
        case 'died':
          comparison = a.died - b.died;
          break;
        default:
          return 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  const sortedPeople = sortPeople(people);

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
              <Link to={{ search: getSortSearchString('name') }}>
                <span className="icon">
                  <i
                    className={`fas ${
                      sortBy === 'name'
                        ? sortOrder === 'asc'
                          ? 'fa-sort-up'
                          : 'fa-sort-down'
                        : 'fa-sort'
                    }`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: getSortSearchString('sex') }}>
                <span className="icon">
                  <i
                    className={`fas ${
                      sortBy === 'sex'
                        ? sortOrder === 'asc'
                          ? 'fa-sort-up'
                          : 'fa-sort-down'
                        : 'fa-sort'
                    }`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: getSortSearchString('born') }}>
                <span className="icon">
                  <i
                    className={`fas ${
                      sortBy === 'born'
                        ? sortOrder === 'asc'
                          ? 'fa-sort-up'
                          : 'fa-sort-down'
                        : 'fa-sort'
                    }`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: getSortSearchString('died') }}>
                <span className="icon">
                  <i
                    className={`fas ${
                      sortBy === 'died'
                        ? sortOrder === 'asc'
                          ? 'fa-sort-up'
                          : 'fa-sort-down'
                        : 'fa-sort'
                    }`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(item => {
          const father = people.find(
            personItem => personItem.name === item.fatherName,
          );

          const mother = people.find(
            personItem => personItem.name === item.motherName,
          );

          return (
            <tr
              data-cy="person"
              key={item.slug}
              className={
                item.slug === selectedSlug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={item} />
              </td>
              <td>{item.sex}</td>
              <td>{item.born}</td>
              <td>{item.died}</td>

              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  item.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  item.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
