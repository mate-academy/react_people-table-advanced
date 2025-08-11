/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[] | null;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPerson, setSelectedPerson] = useState<string | null>(
    slug || null,
  );

  const searchParams = new URLSearchParams(location.search);
  const sortField = searchParams.get('sort') as keyof Person | null;
  const sortOrder = searchParams.get('order');

  useEffect(() => {
    setSelectedPerson(slug || null);
  }, [slug]);

  const handleSort = (field: keyof Person) => {
    let newSortOrder = 'asc';

    if (sortField === field) {
      if (sortOrder === 'asc') {
        newSortOrder = 'desc';
      } else if (sortOrder === 'desc') {
        newSortOrder = '';
      }
    }

    if (newSortOrder) {
      searchParams.set('sort', field);
      searchParams.set('order', newSortOrder);
    } else {
      searchParams.delete('sort');
      searchParams.delete('order');
    }

    navigate({ search: searchParams.toString() });
  };

  const getSortLink = (field: keyof Person) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const currentSortField = newSearchParams.get('sort');
    const currentSortOrder = newSearchParams.get('order');

    let newSortOrder = 'asc';

    if (currentSortField === field) {
      if (currentSortOrder === 'asc') {
        newSortOrder = 'desc';
      } else if (currentSortOrder === 'desc') {
        newSortOrder = '';
      }
    }

    if (newSortOrder) {
      newSearchParams.set('sort', field);
      newSearchParams.set('order', newSortOrder);
    } else {
      newSearchParams.delete('sort');
      newSearchParams.delete('order');
    }

    return `?${newSearchParams.toString()}`;
  };

  const getSortIconClass = (field: keyof Person) => {
    if (sortField === field) {
      if (sortOrder === 'asc') {
        return 'fa-sort-up';
      } else if (sortOrder === 'desc') {
        return 'fa-sort-down';
      }
    }

    return 'fa-sort';
  };

  const sortedPeople = React.useMemo(() => {
    if (!people || !sortField) {
      return people;
    }

    const sorted = [...people].sort((a, b) => {
      if (
        sortField &&
        a[sortField] !== undefined &&
        b[sortField] !== undefined
      ) {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (aValue !== null && bValue !== null) {
          if (aValue < bValue) {
            return sortOrder === 'asc' ? -1 : 1;
          }

          if (aValue > bValue) {
            return sortOrder === 'asc' ? 1 : -1;
          }
        }
      }

      return 0;
    });

    return sorted;
  }, [people, sortField, sortOrder]);

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
              <Link to={getSortLink('name')} onClick={() => handleSort('name')}>
                <span className="icon">
                  <i className={`fas ${getSortIconClass('name')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={getSortLink('sex')} onClick={() => handleSort('sex')}>
                <span className="icon">
                  <i className={`fas ${getSortIconClass('sex')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={getSortLink('born')} onClick={() => handleSort('born')}>
                <span className="icon">
                  <i className={`fas ${getSortIconClass('born')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={getSortLink('died')} onClick={() => handleSort('died')}>
                <span className="icon">
                  <i className={`fas ${getSortIconClass('died')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople &&
          sortedPeople.map(person => (
            <PersonLink
              key={person.slug}
              person={person}
              people={people || []}
              selectedPerson={selectedPerson}
              onPersonSelect={setSelectedPerson}
            />
          ))}
      </tbody>
    </table>
  );
};
