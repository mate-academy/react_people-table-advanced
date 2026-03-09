/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLInk';
import { useFilteredPeople } from '../hooks/useFilteredPeople';
import { getSortParams } from '../hooks/useSearchParam';

const SortableHeader: React.FC<{ field: string; label: string }> = ({
  field,
  label,
}) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const isActive = currentSort === field;
  const isDesc = isActive && currentOrder === 'desc';
  const isAsc = isActive && !currentOrder;

  const iconClass = isDesc ? 'fa-sort-down' : isAsc ? 'fa-sort-up' : 'fa-sort';

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {label}
        <Link to={{ search: getSortParams(searchParams, field) }}>
          <span className="icon">
            <i className={`fas ${iconClass}`} />
          </span>
        </Link>
      </span>
    </th>
  );
};

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug: selectedSlug } = useParams<{ slug: string }>();
  const filtered = useFilteredPeople(people);

  const findPerson = (name: string | null): Person | undefined =>
    name ? people.find(p => p.name === name) : undefined;

  const renderParent = (name: string | null) => {
    if (!name) {
      return <span>-</span>;
    }

    const parent = findPerson(name);

    return parent ? <PersonLink person={parent} /> : <span>{name}</span>;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <SortableHeader field="name" label="Name" />
          <SortableHeader field="sex" label="Sex" />
          <SortableHeader field="born" label="Born" />
          <SortableHeader field="died" label="Died" />
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filtered.length === 0 ? (
          <tr>
            <td colSpan={6} className="has-text-centered">
              There are no people matching the current search criteria
            </td>
          </tr>
        ) : (
          filtered.map(person => (
            <tr
              data-cy="person"
              key={person.slug}
              className={
                person.slug === selectedSlug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{renderParent(person.motherName)}</td>
              <td>{renderParent(person.fatherName)}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
