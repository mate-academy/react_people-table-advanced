import { useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

type Props = {
  people: Person[];
};

const sortFields = ['name', 'sex', 'born', 'died'];

function getSortIcon(field: string, sort: string | null, order: string | null) {
  if (sort !== field) {
    return 'fa-sort';
  }

  return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
}

// пункт 6: цикл asc -> desc -> без сортировки
function getNextSortParams(
  field: string,
  sort: string | null,
  order: string | null,
) {
  if (sort !== field) {
    return { sort: field, order: null };
  }

  if (!order) {
    return { sort: field, order: 'desc' };
  }

  return { sort: null, order: null };
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams(); // выбранный человек — из адреса /people/:slug

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  // 1) находим mother/father как объекты Person (по имени), чтобы делать ссылки
  const peopleWithParents = useMemo(() => {
    return people.map(person => ({
      ...person,
      mother: people.find(p => p.name === person.motherName),
      father: people.find(p => p.name === person.fatherName),
    }));
  }, [people]);

  // 2) фильтрация
  const filteredPeople = useMemo(() => {
    let result = peopleWithParents;

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (query) {
      const normalizedQuery = query.trim().toLowerCase();

      result = result.filter(person =>
        [person.name, person.motherName, person.fatherName].some(name =>
          name?.toLowerCase().includes(normalizedQuery),
        ),
      );
    }

    if (centuries.length > 0) {
      result = result.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    return result;
  }, [peopleWithParents, sex, query, centuries]);

  // 3) сортировка
  const visiblePeople = useMemo(() => {
    if (!sort) {
      return filteredPeople;
    }

    const sorted = [...filteredPeople].sort((a, b) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]);
        case 'born':
        case 'died':
          return a[sort] - b[sort];
        default:
          return 0;
      }
    });

    return order === 'desc' ? sorted.reverse() : sorted;
  }, [filteredPeople, sort, order]);

  if (visiblePeople.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortFields.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field[0].toUpperCase() + field.slice(1)}
                <SearchLink params={getNextSortParams(field, sort, order)}>
                  <span className="icon">
                    <i
                      className={classNames(
                        'fas',
                        getSortIcon(field, sort, order),
                      )}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug, // подсветка выбранного
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
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
