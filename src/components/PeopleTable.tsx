/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import cn from 'classnames';
import { SortQuery } from '../types/SortQuery';
import { SearchLink } from './SearchLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const centuries = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );

  function isQueryIncluded(person: Person, queryFilter = '') {
    const LowerQuery = queryFilter.toLowerCase();

    return (
      person.name.toLowerCase().includes(LowerQuery) ||
      person.fatherName?.toLowerCase().includes(LowerQuery) ||
      person.motherName?.toLowerCase().includes(LowerQuery)
    );
  }

  function isBornInCentury(person: Person, centuriesFilter: string[] = []) {
    return (
      centuriesFilter.length === 0 ||
      centuriesFilter.includes(Math.ceil(person.born / 100).toString())
    );
  }

  const getComparator = (sortBy: string) => {
    switch (sortBy) {
      case SortQuery.Name:
        return (a: Person, b: Person) => a.name.localeCompare(b.name);
      case SortQuery.Sex:
        return (a: Person, b: Person) => a.sex.localeCompare(b.sex);
      case SortQuery.Born:
        return (a: Person, b: Person) => a.born - b.born;
      case SortQuery.Died:
        return (a: Person, b: Person) => a.died - b.died;

      default:
        return undefined;
    }
  };

  const preparedPeople = useMemo(() => {
    const comparator = getComparator(sort);
    const filtered = people.filter(
      person =>
        (!sex || person.sex === sex) &&
        isQueryIncluded(person, query || '') &&
        isBornInCentury(person, centuries),
    );

    if (!comparator) {
      return filtered;
    }

    const sorted = [...filtered].sort(comparator);

    return order === 'desc' ? sorted.reverse() : sorted;
  }, [people, sex, query, centuries, sort, order]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortQuery).map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {String(field)}
                <SearchLink
                  params={{
                    sort: order === 'desc' && sort === field ? null : field,
                    order: sort === field && !order ? 'desc' : null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={cn('fas', 'fa-sort', {
                        'fa-sort-up': sort === field && !order,
                        'fa-sort-down': sort === field && order,
                      })}
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
        {preparedPeople.map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} name={person.name} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  <PersonLink person={mother} name={person.motherName} />
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  <PersonLink person={father} name={person.fatherName} />
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
