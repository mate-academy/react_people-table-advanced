import React from 'react';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  sortBy: string;
  order: string;
  getSortParams: (field: string) => {
    sort: string | null;
    order: string | null;
  };
};

export const PeopleTable: React.FC<Props> = ({
  people,
  sortBy,
  order,
  getSortParams,
}) => {
  const [searchParams] = useSearchParams();
  const { personSlug } = useParams();

  const findPersonByName = (name: string) => people.find(p => p.name === name);

  const renderSortableHeader = (field: string, label: string) => (
    <th className="is-sortable">
      <SearchLink params={getSortParams(field)}>
        <span className="is-nowrap">{label}</span>
        <span className="icon">
          <i
            className={cn('fas', {
              'fa-sort': sortBy !== field,
              'fa-sort-up': sortBy === field && !order,
              'fa-sort-down': sortBy === field && order === 'desc',
            })}
          />
        </span>
      </SearchLink>
    </th>
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-fullwidth"
    >
      <thead>
        <tr>
          {renderSortableHeader('name', 'Name')}
          {renderSortableHeader('sex', 'Sex')}
          {renderSortableHeader('born', 'Born')}
          {renderSortableHeader('died', 'Died')}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = person.slug === personSlug;
          const mother = findPersonByName(person.motherName || '');
          const father = findPersonByName(person.fatherName || '');

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'is-selected': isSelected,
                'has-background-warning': isSelected,
              })}
            >
              <td>
                <Link
                  className={cn({
                    'has-text-danger': person.sex === 'f',
                    'has-text-info': person.sex === 'm',
                  })}
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: searchParams.toString(),
                  }}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName &&
                  (mother ? (
                    <Link
                      className="has-text-danger"
                      to={{
                        pathname: `/people/${mother.slug}`,
                        search: searchParams.toString(),
                      }}
                    >
                      {person.motherName}
                    </Link>
                  ) : (
                    <span>{person.motherName}</span>
                  ))}
                {!person.motherName && (
                  <span className="has-text-grey-light">-</span>
                )}
              </td>
              <td>
                {person.fatherName &&
                  (father ? (
                    <Link
                      to={{
                        pathname: `/people/${father.slug}`,
                        search: searchParams.toString(),
                      }}
                    >
                      {person.fatherName}
                    </Link>
                  ) : (
                    <span>{person.fatherName}</span>
                  ))}
                {!person.fatherName && (
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
