/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  people: Person[];
  selectedSlug?: string;
  onSortChange: (field: string) => void;
  currentSort: string | null;
  currentOrder: string | null;
}

const SortIcon = ({
  field,
  currentSort,
  currentOrder,
}: {
  field: string;
  currentSort: string | null;
  currentOrder: string | null;
}) => {
  if (currentSort !== field) {
    return <i className="fas fa-sort" />;
  }

  if (currentOrder !== 'desc') {
    return <i className="fas fa-sort-down" />;
  }

  return <i className="fas fa-sort-up" />;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  onSortChange,
  currentSort,
  currentOrder,
}) => {
  const { search } = useLocation();

  const findParentInList = (name: string | null) => {
    return people.find(p => p.name === name);
  };

  const renderLinkOrText = (
    person: Person,
    field: 'mother' | 'father',
  ): JSX.Element | string => {
    const parentObj = field === 'mother' ? person.mother : person.father;
    const parentName =
      field === 'mother' ? person.motherName : person.fatherName;

    const linkedPerson = findParentInList(parentName);

    const target = linkedPerson || parentObj;

    if (target && (target.slug || target.id)) {
      return (
        <Link
          to={{
            pathname: `/people/${target.slug || target.id}`,
            search,
          }}
          className={
            field === 'mother' || target.sex === 'f' ? 'has-text-danger' : ''
          }
          key={target.id}
        >
          {parentName}
        </Link>
      );
    }

    if (parentName) {
      return (
        <span className={field === 'mother' ? 'has-text-danger' : ''}>
          {parentName}
        </span>
      );
    }

    return '-';
  };

  const renderSortHeader = (field: string, title: string) => (
    <th key={field}>
      <span className="is-flex is-flex-wrap-nowrap">
        {title}
        <button
          type="button"
          onClick={() => onSortChange(field)}
          className="button is-ghost p-0 h-auto has-text-danger ml-1"
          style={{ border: 'none', background: 'none' }}
        >
          <span className="icon">
            <SortIcon
              field={field}
              currentSort={currentSort}
              currentOrder={currentOrder}
            />
          </span>
        </button>
      </span>
    </th>
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {renderSortHeader('name', 'Name')}
          {renderSortHeader('sex', 'Sex')}
          {renderSortHeader('born', 'Born')}
          {renderSortHeader('died', 'Died')}
          <th key="mother">Mother</th>
          <th key="father">Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected =
            selectedSlug === (person.slug || person.id.toString());

          return (
            <tr
              data-cy="person"
              key={person.id}
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <Link
                  to={{
                    pathname: `/people/${person.slug || person.id}`,
                    search,
                  }}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{renderLinkOrText(person, 'mother')}</td>
              <td>{renderLinkOrText(person, 'father')}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
