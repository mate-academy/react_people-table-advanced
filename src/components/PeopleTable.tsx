import { FC } from 'react';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  selectedSlug: string | null;
  onSelectPerson: (slug: string) => void;
};

export const PeopleTable: FC<Props> = ({
  people,
  selectedSlug,
  onSelectPerson,
}) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order') || 'asc';

  const visiblePeople = [...people].sort((p1, p2) => {
    if (!sortField) {
      return 0;
    }

    let result = 0;

    switch (sortField) {
      case 'born':
        result = p1.born - p2.born;
        break;
      case 'died':
        result = p1.died - p2.died;
        break;
      case 'name':
        result = p1.name.localeCompare(p2.name);
        break;
      case 'sex':
        result = p1.sex.localeCompare(p2.sex);
        break;
      default:
        result = 0;
    }

    return sortOrder === 'asc' ? result : -result;
  });

  const renderSortIcon = (field: string) => {
    if (sortField !== field) {
      return <i className="fas fa-sort" />;
    }

    switch (sortOrder) {
      case 'asc':
        return <i className="fas fa-sort-up" />;
      case 'desc':
        return <i className="fas fa-sort-down" />;
      default:
        return <i className="fas fa-sort" />;
    }
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
                  sort:
                    sortField === 'name' && sortOrder === 'desc'
                      ? null
                      : 'name',
                  order:
                    sortField === 'name' && sortOrder === 'asc' ? 'desc' : null,
                }}
              >
                <span className="icon">{renderSortIcon('name')}</span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  sort:
                    sortField === 'sex' && sortOrder === 'desc' ? null : 'sex',
                  order:
                    sortField === 'sex' && sortOrder === 'asc' ? 'desc' : null,
                }}
              >
                <span className="icon">{renderSortIcon('sex')}</span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  sort:
                    sortField === 'born' && sortOrder === 'desc'
                      ? null
                      : 'born',
                  order:
                    sortField === 'born' && sortOrder === 'asc' ? 'desc' : null,
                }}
              >
                <span className="icon">{renderSortIcon('born')}</span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  sort:
                    sortField === 'died' && sortOrder === 'desc'
                      ? null
                      : 'died',
                  order:
                    sortField === 'died' && sortOrder === 'asc' ? 'desc' : null,
                }}
              >
                <span className="icon">{renderSortIcon('died')}</span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>
              <Link
                to={{
                  pathname: `/people/${person.slug}`,
                  search: searchParams.toString(),
                }}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
                onClick={() => onSelectPerson(person.slug)}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              <PersonLink
                name={person.motherName}
                people={visiblePeople}
                onSelectPerson={onSelectPerson}
              />
            </td>
            <td>
              <PersonLink
                name={person.fatherName}
                people={visiblePeople}
                onSelectPerson={onSelectPerson}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
