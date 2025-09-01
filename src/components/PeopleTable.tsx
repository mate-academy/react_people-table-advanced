import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { SORT_BY } from './conststans/sorts';
import { useMemo } from 'react';
import { SortBy, SortOrder } from '../types/sort';
import { setSearch } from '../utils/sortPeople';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  peopleMap: Map<string, Person>;
  filteredPeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ peopleMap, filteredPeople }) => {
  const { slug: selectedSlug } = useParams();
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') as SortBy | null;
  const order = (searchParams.get('order') as SortOrder) || 'asc';

  const sortedPeople = useMemo(() => {
    if (!sortBy) {
      return filteredPeople;
    }

    const sorted = [...filteredPeople].sort((a, b) => {
      if (sortBy === 'born' || sortBy === 'died') {
        return Number(a[sortBy] - Number(b[sortBy]));
      } else {
        return a[sortBy].localeCompare(b[sortBy], undefined, {
          sensitivity: 'base',
        });
      }
    });

    if (order === 'desc') {
      sorted.reverse();
    }

    return sorted;
  }, [filteredPeople, order, sortBy]);

  const getPersonCell = (name: string | null): string | JSX.Element => {
    if (!name) {
      return '-';
    }

    const person = peopleMap.get(name);

    return person ? <PersonLink person={person} /> : name;
  };

  const getSortIconClass = (column: SortBy) => {
    if (sortBy !== column) {
      return 'fa-sort';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_BY.map(column => (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column.charAt(0).toUpperCase() + column.slice(1)}
                <Link
                  to={{
                    search: setSearch(column, sortBy, order, searchParams),
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', getSortIconClass(column))}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const { sex, born, died, fatherName, motherName, slug } = person;
          const isSelected = selectedSlug === slug;

          return (
            <tr
              key={slug}
              className={classNames({
                'has-background-warning': isSelected,
              })}
              data-cy="person"
            >
              <td>{<PersonLink person={person} />}</td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{getPersonCell(motherName)}</td>
              <td>{getPersonCell(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
