import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import React from 'react';

type PeopleProps = {
  people: Person[] | undefined;
};

export const PeopleTable = ({ people }: PeopleProps) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const getSortLink = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');
    const newParams = new URLSearchParams(searchParams);

    if (currentSort !== field) {
      newParams.set('sort', field);
      newParams.delete('order');
    } else if (!currentOrder) {
      newParams.set('order', 'desc');
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    return `?${newParams.toString()}`;
  };

  const getSortIcon = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== field) {
      return 'fas fa-sort';
    }

    if (currentOrder === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
  };

  const findPersonByName = (name: string | null): Person | undefined => {
    return people?.find(p => p.name === name);
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
              <Link to={getSortLink('name')}>
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={getSortLink('sex')}>
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={getSortLink('born')}>
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={getSortLink('died')}>
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      {people?.map(person => {
        const isSelected = person.slug === slug;
        const mother = findPersonByName(person.motherName);
        const father = findPersonByName(person.fatherName);

        return (
          <tbody key={person.slug}>
            <tr
              data-cy="person"
              className={isSelected ? `has-background-warning` : ''}
            >
              <td>
                <PersonLink
                  person={person}
                  isWoman={person.sex === 'f'}
                  name={person.name}
                />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  <PersonLink
                    person={mother}
                    isWoman={true}
                    name={person.motherName}
                  />
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  <PersonLink
                    person={father}
                    isWoman={false}
                    name={person.fatherName}
                  />
                ) : (
                  '-'
                )}
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
};
