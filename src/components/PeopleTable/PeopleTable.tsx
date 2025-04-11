import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import React from 'react';
import { SearchLink } from '../SearchLink';

type PeopleProps = {
  people: Person[] | undefined;
};

export const PeopleTable = ({ people }: PeopleProps) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const getSortLink = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== field) {
      return {
        sort: field,
        order: null,
      };
    }

    if (!currentOrder) {
      return {
        sort: field,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
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
              <SearchLink params={getSortLink('name')}>
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortLink('sex')}>
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortLink('born')}>
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortLink('died')}>
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </SearchLink>
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
