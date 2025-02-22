import { NavLink, useParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';
import { renderParentLink } from '../../helper/renderParentLink';
import { useFilterParams } from '../hooks/useFilterParam';
import { useState } from 'react';
import { ROUTES } from '../../utils/routes';

type Props = {
  people: Person[];
  visiblePeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people, visiblePeople }) => {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('none');

  const { searchParams, setSearchParams } = useFilterParams();

  const columns = ['name', 'sex', 'born', 'died'];

  const sortPeople = () => {
    if (order === 'none') {
      return visiblePeople;
    }

    const sortedPeople = [...visiblePeople].sort((a, b) => {
      const aValue = String(a[sortBy as keyof Person]);
      const bValue = String(b[sortBy as keyof Person]);

      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sortedPeople;
  };

  const handleSort = (newSortBy: string) => {
    let newOrder = 'asc';

    if (sortBy === newSortBy) {
      if (order === 'asc') {
        newOrder = 'desc';
      } else if (order === 'desc') {
        newOrder = 'none';
      }
    }

    setSortBy(newSortBy);
    setOrder(newOrder);

    searchParams.set('sort', newSortBy);
    if (newOrder === 'desc') {
      searchParams.set('order', newOrder);
    } else {
      searchParams.delete('order');
    }

    setSearchParams(searchParams);
  };

  const sortedPeople = sortPeople();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column.charAt(0).toUpperCase() + column.slice(1)}
                <a onClick={() => handleSort(column)}>
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort-up': sortBy === column && order === 'asc',
                        'fa-sort-down': sortBy === column && order === 'desc',
                        'fa-sort': sortBy !== column || order === 'none',
                      })}
                    />
                  </span>
                </a>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <NavLink
                  to={`/${ROUTES.PEOPLE}/${person.slug}?${searchParams.toString()}`}
                  className={cn({ 'has-text-danger': person.sex === 'f' })}
                >
                  {person.name}
                </NavLink>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {renderParentLink(person, people, 'motherName', searchParams)}
              </td>
              <td>
                {renderParentLink(person, people, 'fatherName', searchParams)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
