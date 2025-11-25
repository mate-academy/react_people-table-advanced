import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { Person } from '../../types';

type Props = {
  people: Person[];
  sort: string | null;
  order: string | null;
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  sort,
  order,
  selectedSlug,
}) => {
  const [searchParams] = useSearchParams();

  const getSortParams = (fieldKey: string) => {
    let newSort: string | null = fieldKey;
    let newOrder: string | null = null;

    if (sort === fieldKey) {
      if (!order) {
        newOrder = 'desc';
      } else {
        newOrder = null;
        newSort = null;
      }
    } else {
      newOrder = null;
    }

    return { sort: newSort, order: newOrder };
  };

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  const SortableHeader: React.FC<{
    field: string;
    label: string;
  }> = ({ field, label }) => (
    <th>
      <SearchLink
        params={getSortParams(field)}
        className="is-flex is-flex-wrap-nowrap"
      >
        <span className="has-text-dark">{label}</span>
        <span className="icon has-text-link">
          <i className={`fas ${getSortIcon(field)}`} />
        </span>
      </SearchLink>
    </th>
  );

  const PersonRow: React.FC<{ person: Person }> = ({ person }) => {
    const isSelected = person.slug === selectedSlug;
    const nameClass = person.sex === 'f' ? 'has-text-danger' : '';

    return (
      <tr
        key={person.slug}
        data-cy="person"
        className={isSelected ? 'has-background-warning' : ''}
      >
        <td>
          <Link
            className={nameClass}
            to={`/people/${person.slug}?${searchParams.toString()}`}
          >
            {person.name}
          </Link>
        </td>
        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>

        {/* Mother Column */}
        <td>
          {person.motherName ? (
            person.mother ? (
              <Link
                className={person.mother?.sex === 'f' ? 'has-text-danger' : ''}
                to={`/people/${person.mother?.slug}?${searchParams.toString()}`}
              >
                {person.motherName}
              </Link>
            ) : (
              person.motherName
            )
          ) : (
            '-'
          )}
        </td>

        {/* Father Column */}
        <td>
          {person.fatherName ? (
            person.father ? (
              <Link
                to={`/people/${person.father?.slug}?${searchParams.toString()}`}
              >
                {person.fatherName}
              </Link>
            ) : (
              person.fatherName
            )
          ) : (
            '-'
          )}
        </td>
      </tr>
    );
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

          {/* Non-sortable headers */}
          <th>
            <span className="has-text-dark">Mother</span>
          </th>
          <th>
            <span className="has-text-dark">Father</span>
          </th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
