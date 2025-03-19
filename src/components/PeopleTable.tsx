/* eslint-disable @typescript-eslint/indent */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const PersonLink = ({
  name,
  slug,
  isFemale,
  people,
}: {
  name: string;
  slug?: string;
  isFemale?: boolean;
  people: Person[];
}) => {
  if (!name) {
    return <span>-</span>;
  }

  const personExists = people.some(person => person.name === name);

  if (personExists) {
    const linkSlug = slug || people.find(person => person.name === name)?.slug;

    return (
      <Link
        className={isFemale ? 'has-text-danger' : ''}
        to={`/people/${linkSlug}`}
      >
        {name}
      </Link>
    );
  }

  return <span>{name}</span>;
};

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const { slug } = useParams<{ slug: string }>();
  const [sortColumn, setSortColumn] = useState<
    'name' | 'sex' | 'born' | 'died' | null
  >(null);

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');

  const handleSort = (column: 'name' | 'sex' | 'born' | 'died') => {
    if (sortColumn !== column) {
      setSortColumn(column);
      setSortOrder('asc');
    } else {
      setSortOrder(prev =>
        prev === 'asc' ? 'desc' : prev === 'desc' ? 'none' : 'asc',
      );
      if (sortOrder === 'none') {
        setSortColumn(null);
      }
    }
  };

  const sortedPeople = [...people].sort((a, b) => {
    if (!sortColumn || sortOrder === 'none') {
      return 0;
    }

    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (sortColumn === 'sex') {
      return sortOrder === 'asc'
        ? valueA === 'f'
          ? -1
          : 1
        : valueA === 'f'
          ? 1
          : -1;
    }

    if (sortColumn === 'name') {
      return sortOrder === 'asc'
        ? String(valueA).localeCompare(String(valueB))
        : typeof valueB === 'string' && typeof valueA === 'string'
          ? valueB.localeCompare(valueA)
          : 0;
    }

    return sortOrder === 'asc'
      ? Number(valueA) - Number(valueB)
      : Number(valueB) - Number(valueA);
  });

  const getSortIcon = (column: 'name' | 'sex' | 'born' | 'died') => {
    if (sortColumn !== column) {
      return 'fas fa-sort';
    }

    return sortOrder === 'asc'
      ? 'fas fa-sort-up'
      : sortOrder === 'desc'
        ? 'fas fa-sort-down'
        : 'fas fa-sort';
  };

  const getSortUrl = (column: 'name' | 'sex' | 'born' | 'died') => {
    if (sortColumn !== column) {
      return `/people?sort=${column}`;
    }

    if (sortOrder === 'asc') {
      return `/people?sort=${column}&order=desc`;
    }

    if (sortOrder === 'desc') {
      return `/people`;
    }

    return `/people?sort=${column}`;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(column => (
            <th
              key={column}
              onClick={() =>
                handleSort(column as 'name' | 'sex' | 'born' | 'died')
              }
            >
              <span className="is-flex is-flex-wrap-nowrap">
                {column.charAt(0).toUpperCase() + column.slice(1)}
                <Link
                  to={getSortUrl(column as 'name' | 'sex' | 'born' | 'died')}
                >
                  <span className="icon">
                    <i
                      className={getSortIcon(
                        column as 'name' | 'sex' | 'born' | 'died',
                      )}
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
        {sortedPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink
                name={person.name}
                slug={person.slug}
                isFemale={person.sex === 'f'}
                people={people}
              />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink
                name={person.motherName || ''}
                slug={person.mother?.slug}
                isFemale={true}
                people={people}
              />
            </td>
            <td>
              <PersonLink
                name={person.fatherName || ''}
                slug={person.father?.slug}
                isFemale={false}
                people={people}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
