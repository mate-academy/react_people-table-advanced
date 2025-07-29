import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useMemo } from 'react';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  people: Person[];
}

export const PeopleTable = ({ people }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';

  const getSortParams = (field: string) => {
    const isSameField = currentSort === field;
    let nextOrder;

    if (!isSameField) {
      nextOrder = 'asc';
    } else {
      if (currentOrder === 'asc') {
        nextOrder = 'desc';
      } else {
        nextOrder = null;
      }
    }

    const newSearch = getSearchWith(searchParams, {
      sort: nextOrder ? field : null,
      order: nextOrder,
    });

    setSearchParams(newSearch);
  };

  const getSortIcon = (field: string) => {
    if (currentSort !== field) {
      return (
        <span className="icon">
          <i className="fas fa-sort" />
        </span>
      );
    }

    return currentOrder === 'desc' ? (
      <span className="icon">
        <i className="fas fa-sort-down" />
      </span>
    ) : (
      <span className="icon">
        <i className="fas fa-sort-up" />
      </span>
    );
  };

  const isHighlighted = (personSlug: string) => {
    return selectedSlug === personSlug;
  };

  const handleRowClick = (personSlug: string) => {
    setSelectedSlug(prevSlug => (prevSlug === personSlug ? null : personSlug));
  };

  const sortedPeople = useMemo(() => {
    if (!currentSort) {
      return people;
    }

    return [...people].sort((a, b) => {
      let comparison = 0;

      if (currentSort === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (currentSort === 'sex') {
        comparison = a.sex.localeCompare(b.sex);
      } else if (currentSort === 'born') {
        comparison = a.born - b.born;
      } else if (currentSort === 'died') {
        comparison = a.died - b.died;
      }

      return currentOrder === 'desc' ? -comparison : comparison;
    });
  }, [people, currentSort, currentOrder]);

  useMemo(() => {
    if (selectedSlug) {
      const personStillExists = people.some(
        person => person.slug === selectedSlug,
      );

      if (!personStillExists) {
        setSelectedSlug(null);
      }
    }
  }, [people, selectedSlug]);

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
              <a
                onClick={e => {
                  e.preventDefault();
                  getSortParams('name');
                }}
              >
                {getSortIcon('name')}
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                onClick={e => {
                  e.preventDefault();
                  getSortParams('sex');
                }}
              >
                {getSortIcon('sex')}
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                onClick={e => {
                  e.preventDefault();
                  getSortParams('born');
                }}
              >
                {getSortIcon('born')}
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                onClick={e => {
                  e.preventDefault();
                  getSortParams('died');
                }}
              >
                {getSortIcon('died')}
              </a>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              isHighlighted(person.slug) ? 'has-background-warning' : ''
            }
            onClick={() => handleRowClick(person.slug)}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                <PersonLink
                  person={
                    people.find(p => p.name === person.motherName) || null
                  }
                  name={person.motherName}
                />
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <PersonLink
                  person={
                    people.find(p => p.name === person.fatherName) || null
                  }
                  name={person.fatherName}
                />
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
