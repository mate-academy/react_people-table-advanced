import React, { useEffect, useState } from 'react';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
  sortBy: keyof Person | null;
  sortOrder: 'asc' | 'desc' | 'default';
  onSort: (field: keyof Person) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  sortBy,
  sortOrder,
  onSort,
}) => {
  const getSelectedSlug = (): string | null => {
    const [, queryString] = window.location.hash.slice(1).split('?');
    const params = new URLSearchParams(queryString || '');

    return params.get('slug');
  };

  const selectedSlug = getSelectedSlug();

  const updateSlugHash = (slug: string | null) => {
    const [path, queryString] = window.location.hash.slice(1).split('?');
    const params = new URLSearchParams(queryString || '');

    if (slug === null) {
      params.delete('slug');
    } else {
      params.set('slug', slug);
    }

    window.location.hash = `${path}?${params.toString()}`;
  };

  const handleSlugClick = (personSlug: string) => {
    const newSlug = selectedSlug === personSlug ? null : personSlug;

    updateSlugHash(newSlug);
  };

  const getSortIcon = (field: keyof Person) => {
    const icons = {
      asc: <i className="fas fa-sort-up" />,
      desc: <i className="fas fa-sort-down" />,
      default: <i className="fas fa-sort" />,
    };

    return sortBy === field ? icons[sortOrder] : icons.default;
  };

  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const handleHashChange = () => {
      forceUpdate(n => n + 1);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const findPersonByName = (name: string | undefined): Person | undefined =>
    people.find(p => p.name === name);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <a
                  href="#/people"
                  onClick={e => {
                    e.preventDefault();
                    onSort(field as keyof Person);
                  }}
                >
                  <span className="icon">
                    {getSortIcon(field as keyof Person)}
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
        {people.map(person => {
          const isSelected = selectedSlug === person.slug;

          const mother = findPersonByName(person.motherName || '');
          const father = findPersonByName(person.fatherName || '');

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
              style={{ cursor: 'pointer' }}
            >
              <td>
                <a
                  href="#/people"
                  onClick={e => {
                    e.preventDefault();
                    handleSlugClick(person.slug);
                  }}
                >
                  {person.name}
                </a>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died || '-'}</td>

              <td>
                {mother ? (
                  <a
                    href="#/people"
                    className="has-text-danger"
                    onClick={e => {
                      e.preventDefault();
                      handleSlugClick(mother.slug);
                    }}
                  >
                    {mother.name}
                  </a>
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <a
                    href="#/people"
                    onClick={e => {
                      e.preventDefault();
                      handleSlugClick(father.slug);
                    }}
                  >
                    {father.name}
                  </a>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
