import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
  fullPeopleList: Person[];
  selectedSlug?: string;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  fullPeopleList,
  selectedSlug,
}) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const findPersonByName = (name: string | null) => {
    if (!name) return null;
    return fullPeopleList.find(p => p.name === name);
  };

  const getSortParams = (field: string) => {
    if (currentSort !== field) {
      return { sort: field, order: null };
    }

    if (currentOrder !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const renderSortHeader = (title: string, field: string) => (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {title}
        <SearchLink params={getSortParams(field)}>
          <span className="icon">
            <i className={classNames('fas', {
              'fa-sort': currentSort !== field,
              'fa-sort-up': currentSort === field && currentOrder !== 'desc',
              'fa-sort-down': currentSort === field && currentOrder === 'desc',
            })} />
          </span>
        </SearchLink>
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
          {renderSortHeader('Name', 'name')}
          {renderSortHeader('Sex', 'sex')}
          {renderSortHeader('Born', 'born')}
          {renderSortHeader('Died', 'died')}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = findPersonByName(person.motherName);
          const father = findPersonByName(person.fatherName);

          return (
            <tr
              key={`${person.slug}-${person.born}`}
              data-cy="person"
              className={classNames({
                'has-background-warning': selectedSlug === person.slug
              })}
            >
              <td>
                <SearchLink
                  to={`/people/${person.slug}`}
                  className={classNames({ 'has-text-danger': person.sex === 'f' })}
                >
                  {person.name}
                </SearchLink>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.motherName ? (
                  mother ? (
                    <SearchLink
                      to={`/people/${mother.slug}`}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </SearchLink>
                  ) : person.motherName
                ) : (
                  <span className="has-text-grey-light">-</span>
                )}
              </td>

              <td>
                {person.fatherName ? (
                  father ? (
                    <SearchLink to={`/people/${father.slug}`}>
                      {person.fatherName}
                    </SearchLink>
                  ) : person.fatherName
                ) : (
                  <span className="has-text-grey-light">-</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
