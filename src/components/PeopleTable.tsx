import React from 'react';
import { Person } from '../types';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { useSearchParams, useParams, Link } from 'react-router-dom';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

const sortableColumns = [
  { label: 'Name', field: 'name' },
  { label: 'Sex', field: 'sex' },
  { label: 'Born', field: 'born' },
  { label: 'Died', field: 'died' },
];

type PersonRowProps = {
  person: Person;
  mother: Person | null;
  father: Person | null;
  isSelected: boolean;
  search: string;
};

const PersonRow: React.FC<PersonRowProps> = ({
  person,
  mother,
  father,
  isSelected,
  search,
}) => {
  const renderParent = (
    parent: Person | null,
    nameIfMissing: string | null,
  ) => {
    if (parent) {
      return (
        <Link
          className={cn({ 'has-text-danger': parent.sex === 'f' })}
          to={{ pathname: `/people/${parent.slug}`, search }}
        >
          {parent.name}
        </Link>
      );
    }

    return nameIfMissing || '-';
  };

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': isSelected })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': person.sex === 'f' })}
          to={{ pathname: `/people/${person.slug}`, search }}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{renderParent(mother, person.motherName)}</td>
      <td>{renderParent(father, person.fatherName)}</td>
    </tr>
  );
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const peopleByName = new Map(people.map(person => [person.name, person]));

  const getNextSortParams = (field: string) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortableColumns.map(({ label, field }) => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {label}
                <SearchLink params={getNextSortParams(field)}>
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort': sort !== field,
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
        {people.map(person => {
          const mother = person.motherName
            ? peopleByName.get(person.motherName) || null
            : null;

          const father = person.fatherName
            ? peopleByName.get(person.fatherName) || null
            : null;

          return (
            <PersonRow
              key={person.slug}
              person={person}
              mother={mother}
              father={father}
              isSelected={person.slug === slug}
              search={searchParams.toString()}
            />
          );
        })}
      </tbody>
    </table>
  );
};
