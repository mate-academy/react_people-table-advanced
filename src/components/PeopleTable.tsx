import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

type Props = {
  persons: Person[];
};

const sortableFields = ['name', 'sex', 'born', 'died'] as const;

type SortField = (typeof sortableFields)[number];

export const PeopleTable: React.FC<Props> = ({ persons }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = (searchParams.get('sort') as SortField) || '';
  const order = searchParams.get('order') || '';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortableFields.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <SearchLink
                  params={{
                    sort: sort === field && order === 'desc' ? null : field,
                    order: sort === field && order !== 'desc' ? 'desc' : null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', 'fa-sort', {
                        'fa-sort-up': sort === field && order !== 'desc',
                        'fa-sort-down': sort === field && order === 'desc',
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {persons.map(person => {
          const findParent = (parentName?: string) =>
            persons.find(p => p.name === parentName) || null;

          const mother = person.motherName
            ? findParent(person.motherName)
            : null;
          const father = person.fatherName
            ? findParent(person.fatherName)
            : null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} name={person.name} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <Link
                    to={`/people/${mother.slug}`}
                    className="has-text-danger"
                  >
                    {mother.name}
                  </Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <Link to={`/people/${father.slug}`}>{father.name}</Link>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
