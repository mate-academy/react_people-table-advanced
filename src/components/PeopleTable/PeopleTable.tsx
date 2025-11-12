import cn from 'classnames';
import { Order, Person, SortField } from '../../types';
import { PersonLink } from '../PersonLink';
import React from 'react';

type Props = {
  people: Person[];
  selectedSlug?: string;
  currentSortField: SortField | null;
  currentOrder: Order | null;
  onSearchChange: (sortField: SortField) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  currentSortField,
  currentOrder,
  onSearchChange,
}) => {
  function renderParentCell(parentName?: string, parentObj?: Person) {
    if (parentObj) {
      return <PersonLink person={parentObj} />;
    }

    const name = parentName?.trim();

    if (!name) {
      return '-';
    }

    const found = people.find(person => person.name.trim() === name);

    if (found) {
      return <PersonLink person={found} />;
    } else {
      return name;
    }
  }

  const getSortIconClass = (field: SortField) => {
    if (currentSortField !== field) {
      return 'fas fa-sort';
    }

    return currentOrder === Order.DESC ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  const handleSortClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    field: SortField,
  ) => {
    event.preventDefault();
    onSearchChange(field);
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
              <a
                href="#/people?sort=name"
                onClick={e => handleSortClick(e, SortField.NAME)}
              >
                <span className="icon">
                  <i className={getSortIconClass(SortField.NAME)} />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people?sort=sex"
                onClick={e => handleSortClick(e, SortField.SEX)}
              >
                <span className="icon">
                  <i className={getSortIconClass(SortField.SEX)} />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born"
                onClick={e => handleSortClick(e, SortField.BORN)}
              >
                <span className="icon">
                  <i className={getSortIconClass(SortField.BORN)} />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people?sort=died"
                onClick={e => handleSortClick(e, SortField.DIED)}
              >
                <span className="icon">
                  <i className={getSortIconClass(SortField.DIED)} />
                </span>
              </a>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {renderParentCell(person.motherName ?? undefined, person.mother)}
            </td>
            <td>
              {renderParentCell(person.fatherName ?? undefined, person.father)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
