import React from 'react';
import { PersonWithRelations } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { useParams } from 'react-router-dom';
import { KeyProps } from '../types/KeyProps';
import { getNextSortOrder } from '../hooks/getNextSortOrder';

interface Props {
  people: PersonWithRelations[] | [];
  sortKey: KeyProps | null;
  sortOrder: 'asc' | 'desc';
}

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({
  people,
  sortKey,
  sortOrder,
}) => {
  const { slug } = useParams();

  const renderSortLink = (key: KeyProps) => (
    <SearchLink
      params={{
        sort: getNextSortOrder(sortKey, sortOrder, key) ? key : null,
        order: getNextSortOrder(sortKey, sortOrder, key),
      }}
    >
      <span className="icon">
        <i
          className={classNames('fas fa-sort', {
            'fa-sort-up': sortKey === key && sortOrder === 'asc',
            'fa-sort-down': sortKey === key && sortOrder === 'desc',
          })}
        />
      </span>
    </SearchLink>
  );

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
              {renderSortLink('name')}
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              {renderSortLink('sex')}
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              {renderSortLink('born')}
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              {renderSortLink('died')}
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isActiveSlug = slug === person.slug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({ 'has-background-warning': isActiveSlug })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother ? (
                  <PersonLink person={person.mother} />
                ) : person.motherName ? (
                  person.motherName
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.father ? (
                  <PersonLink person={person.father} />
                ) : person.fatherName ? (
                  person.fatherName
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
