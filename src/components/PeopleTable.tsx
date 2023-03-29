import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { columns } from '../constants';

type Props = {
  slug: string;
  people: Person[] | null;
  searchParams: URLSearchParams;
};

export const PeopleTable: React.FC<Props> = ({
  slug,
  people,
  searchParams,
}) => {
  const isSelected = useCallback((person: Person) => (
    person.slug === slug
  ), [slug]);

  const getPersonLinkByName = useCallback((
    peopleArray: Person[],
    parentName: string | null,
  ) => {
    const parent = peopleArray.find(person => person.name === parentName);

    if (parent) {
      return (
        <PersonLink person={parent} />
      );
    }

    return parentName || '-';
  }, [people]);

  const getSortParams = (name: string) => {
    let sort = `${name.toLowerCase()}` || null;
    let order = null;

    if (searchParams.get('sort') === name.toLowerCase()
      && searchParams.get('order')) {
      sort = null;
    }

    if (searchParams.get('sort') === name.toLowerCase()
      && !searchParams.get('order')) {
      order = 'desc';
    }

    return {
      sort,
      order,
    };
  };

  const changeSortIcon = (name: string) => {
    if (searchParams.get('sort') === name.toLowerCase()
      && !searchParams.get('order')) {
      return 'fa-sort-up';
    }

    if (searchParams.get('sort') === name.toLowerCase()
      && searchParams.get('order')) {
      return 'fa-sort-down';
    }

    return 'fa-sort';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(({ name, sortable }) => (
            <th key={name}>
              {sortable
                ? (
                  <span className="is-flex is-flex-wrap-nowrap">
                    {name}
                    <SearchLink params={getSortParams(name)}>
                      <span className="icon">
                        <i
                          className={classNames('fas', changeSortIcon(name))}
                        />
                      </span>
                    </SearchLink>
                  </span>
                ) : (
                  name
                )}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people && people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': isSelected(person),
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getPersonLinkByName(people, person.motherName)}</td>
            <td>{getPersonLinkByName(people, person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
