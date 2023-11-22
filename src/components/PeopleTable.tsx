import React, { useRef } from 'react';
import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[],
  personId?: string,
}

export const PeopleTable: React.FC<Props> = ({
  people,
  personId,
}) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  // const columnName = useRef('');

  const toggleSort = (column: string) => {
    let newParams = {};

    if (!sort) {
      newParams = { sort: column, order: null };
    }

    if (!order && sort === column) {
      newParams = { sort: column, order: 'desc' };
    }

    if (sort && sort !== column) {
      newParams = { sort: column, order: null };
    }

    if (sort && sort === column && order) {
      newParams = { sort: null, order: null };
    }

    return newParams;
  };

  const isMotherExistInList = (motherName?: string | null) => {
    return people.find(person => person.name === motherName);
  };

  const isFatherExistInList = (fatherName?: string | null) => {
    return people.find(person => person.name === fatherName);
  };

  const getParent = (person: Person, parentType: 'father' | 'mother') => {
    const parentTypeName = parentType === 'mother'
      ? 'motherName'
      : 'fatherName';

    if (!person[parentTypeName]) {
      return <td>-</td>;
    }

    const foundPerson = parentType === 'mother'
      ? isMotherExistInList(person[parentTypeName])
      : isFatherExistInList(person[parentTypeName]);

    console.log(person, foundPerson);

    if (foundPerson) {
      return (
        <td>
          <Link
            className={cn({
              'has-text-danger': foundPerson.sex === 'f',
            })}
            to={`/people/${foundPerson.slug}`}
          >
            {foundPerson.name}
          </Link>
        </td>
      );
    }

    return (
      <td>
        {person[parentTypeName]}
      </td>
    );
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
              <SearchLink
                params={toggleSort('name')}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={toggleSort('sex')}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={toggleSort('born')}
              >
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={toggleSort('died')}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      {people.map(person => (
        <tbody
          key={person.slug}
        >
          <tr
            data-cy="person"
            className={cn({
              'has-background-warning':
                person.slug === personId,
            })}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={cn({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {getParent(person, 'mother')}
            {getParent(person, 'father')}
          </tr>
        </tbody>
      ))}
    </table>
  );
};
