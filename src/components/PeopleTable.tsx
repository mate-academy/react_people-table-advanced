/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
}

type SortableFields = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const sort = searchParams.get('sort') as SortableFields | null;
  const order = searchParams.get('order');

  const renderSortIcon = (field: SortableFields) => {
    if (sort !== field) {
      return <i className="fas fa-sort" />;
    }

    return order === 'desc' ? (
      <i className="fas fa-sort-down" />
    ) : (
      <i className="fas fa-sort-up" />
    );
  };

  const getNextSortParams = (field: SortableFields) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const renderParentLink = (parentName: string | null) => {
    if (!parentName) {
      return <span className="has-text-grey-light">-</span>;
    }

    const parent = people.find(p => p.name === parentName);

    if (parent) {
      return (
        <a
          href={`#/people/${parent.slug}`}
          className={parent.sex === 'f' ? 'has-text-danger' : ''}
        >
          {parentName}
        </a>
      );
    }

    return parentName;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {(['name', 'sex', 'born', 'died'] as SortableFields[]).map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <SearchLink params={getNextSortParams(field)}>
                  <span className="icon">{renderSortIcon(field)}</span>
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={person.slug === slug ? 'has-background-warning' : ''}
          >
            <td>
              <a
                href={`#/people/${person.slug}`}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </a>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderParentLink(person.motherName)}</td>
            <td>{renderParentLink(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
