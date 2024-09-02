import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { getSearchWith } from '../../utils/searchHelper';
import { SortField, SortOrder } from '../../types/SortTypes';
import { getSortIconClass } from '../../utils/getSortIcon';

type Props = {
  filteredPeople: Person[];
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ filteredPeople, people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortField, setSortField] = useState<SortField>(
    (searchParams.get('sort') as SortField) || null,
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    (searchParams.get('order') as SortOrder) || 'asc',
  );

  useEffect(() => {
    const params: { [key: string]: string } = {};

    if (sortField) {
      params.sort = sortField;
      if (sortOrder === 'desc') {
        params.order = sortOrder;
      }
    }

    setSearchParams(params, { replace: true });
  }, [sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortField(null);
        setSortOrder('asc');
      }
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sortField) {
      return 0;
    }

    if (a[sortField] < b[sortField]) {
      return sortOrder === 'asc' ? -1 : 1;
    }

    if (a[sortField] > b[sortField]) {
      return sortOrder === 'asc' ? 1 : -1;
    }

    return 0;
  });

  const getLinkParams = (field: SortField) => {
    if (sortField === field) {
      return {
        sort: field,
        order: sortOrder === 'asc' ? 'desc' : 'asc',
      };
    }

    return { sort: field, order: 'asc' };
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
              <Link
                to={`?${getSearchWith(searchParams, getLinkParams('name'))}`}
                onClick={() => handleSort('name')}
              >
                <span className="icon">
                  <i
                    className={`fas ${getSortIconClass(sortField, 'name', sortOrder)}`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={`?${getSearchWith(searchParams, getLinkParams('sex'))}`}
                onClick={() => handleSort('sex')}
              >
                <span className="icon">
                  <i
                    className={`fas ${getSortIconClass(sortField, 'sex', sortOrder)}`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={`?${getSearchWith(searchParams, getLinkParams('born'))}`}
                onClick={() => handleSort('born')}
              >
                <span className="icon">
                  <i
                    className={`fas ${getSortIconClass(sortField, 'born', sortOrder)}`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={`?${getSearchWith(searchParams, getLinkParams('died'))}`}
                onClick={() => handleSort('died')}
              >
                <span className="icon">
                  <i
                    className={`fas ${getSortIconClass(sortField, 'died', sortOrder)}`}
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
        {sortedPeople.map(person => (
          <PersonLink key={person.slug} {...person} people={people} />
        ))}
      </tbody>
    </table>
  );
};
