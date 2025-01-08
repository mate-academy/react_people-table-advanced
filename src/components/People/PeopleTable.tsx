/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person, SortField, SortOrder } from '../../types';
import classNames from 'classnames';
import { PersonLink } from '../index';
import React from 'react';
import { SearchLink } from '../SearchLink';
import { SearchParams } from '../../utils/searchHelper';

type Props = {
  people?: Person[];
  slug: string | undefined;
  searchPeopleByName: (name: string | null) => Person | undefined;
  sortColumn: SortField;
  sortOrder: string;
};

// eslint-disable-next-line max-len
const PeopleTable: React.FC<Props> = ({
  people,
  searchPeopleByName,
  slug,
  sortOrder,
  sortColumn,
}) => {
  const getNextSortState = (field: SortField): SearchParams => {
    if (sortColumn === field) {
      if (sortOrder === SortOrder.Asc) {
        return { sort: field, order: 'desc' };
      }

      if (sortOrder === SortOrder.Desc) {
        return { sort: null, order: null };
      }
    }

    return { sort: field, order: null };
  };

  const renderArrows = (field: SortField) => {
    if (sortColumn === field) {
      if (sortOrder === SortOrder.Asc) {
        return <i className="fas fa-sort-up" />;
      }

      if (sortOrder === SortOrder.Desc) {
        return <i className="fas fa-sort-down" />;
      }

      return <i className="fas fa-sort" />;
    }

    return <i className="fas fa-sort" />;
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
              <SearchLink params={getNextSortState(SortField.Name)}>
                <span className="icon">{renderArrows(SortField.Name)}</span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getNextSortState(SortField.Sex)}>
                <span className="icon">{renderArrows(SortField.Sex)}</span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getNextSortState(SortField.Born)}>
                <span className="icon">{renderArrows(SortField.Born)}</span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getNextSortState(SortField.Died)}>
                <span className="icon">{renderArrows(SortField.Died)}</span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people?.map(person => (
          <tr
            data-cy="person"
            key={person.name}
            className={classNames('', {
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {searchPeopleByName(person.motherName) ? (
                <PersonLink person={searchPeopleByName(person.motherName)} />
              ) : (
                <span>{person.motherName ? `${person.motherName}` : '-'}</span>
              )}
            </td>

            <td>
              {searchPeopleByName(person.fatherName) ? (
                <PersonLink person={searchPeopleByName(person.fatherName)} />
              ) : (
                <span>{person.fatherName ? `${person.fatherName}` : '-'}</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
