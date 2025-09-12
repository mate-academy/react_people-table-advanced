import PersonLink from './PersonLink';
import { Person } from '../types/Person';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SortType, OrderType } from '../types/Sort';
import { useSortableColumns } from '../hooks/useSortableColumns';
import { useEffect, useState } from 'react';

type Props = {
  people: Person[];
  searchParams: URLSearchParams;
};

const PeopleTable: React.FC<Props> = ({ people, searchParams }) => {
  const [sortedPeople, setSortedPeople] = useState<Person[]>(people);

  const location = useLocation();
  const { SortableColumns } = useSortableColumns();

  const getSort = (searchParams.get('sort') as SortType) || null;
  const getOrder = (searchParams.get('order') as OrderType) || null;

  useEffect(() => {
    if (getSort) {
      const sortedData = SortableColumns(getSort, getOrder, people);

      setSortedPeople(sortedData);
    } else {
      setSortedPeople(people);
    }
  }, [getSort, getOrder, people, SortableColumns]);

  const handleSort = (sortBy: SortType) => {
    if (getSort === sortBy) {
      if (getOrder === null) {
        return `/people?${getSearchWith(searchParams, { sort: sortBy, order: 'desc' })}`;
      } else if (getOrder === 'desc') {
        return `/people?${getSearchWith(searchParams, { sort: null, order: null })}`;
      }

      return `/people?${getSearchWith(searchParams, { sort: sortBy, order: null })}`;
    }

    return `/people?${getSearchWith(searchParams, { sort: sortBy, order: null })}`;
  };

  const handleArrowsStyles = (sortedValue: SortType) => {
    return {
      'fas fa-sort': getSort !== sortedValue,
      'fas fa-sort-up': getSort === sortedValue && !getOrder,
      'fas fa-sort-down': getSort === sortedValue && getOrder === 'desc',
    };
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
              <Link to={handleSort('name')}>
                {/* '#/people?sort=name' */}

                <span className="icon">
                  {/* <i className="fas fa-sort-down" /> */}
                  <i className={cn(handleArrowsStyles('name'))} />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={handleSort('sex')}>
                <span className="icon">
                  <i className={cn(handleArrowsStyles('sex'))} />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={handleSort('born')}>
                <span className="icon">
                  <i className={cn(handleArrowsStyles('born'))} />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={handleSort('died')}>
                <span className="icon">
                  <i className={cn(handleArrowsStyles('died'))} />
                </span>
              </Link>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const isActive = location.pathname === `/people/${person.slug}`;

          const mother = sortedPeople?.find(p => p.name === person.motherName);

          const father = sortedPeople?.find(f => f.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn('', {
                'has-background-warning': isActive,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink person={mother} name={person.motherName} />
              </td>
              <td>
                <PersonLink person={father} name={person.fatherName} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PeopleTable;
