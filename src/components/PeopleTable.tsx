import React from 'react';
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
  const isSelected = (person: Person) => person.slug === slug;

  const getPersonLinkByName = (parentName: string | null) => {
    const parent = people && people.find(person => person.name === parentName);

    if (parent) {
      return (
        <PersonLink person={parent} />
      );
    }

    return parentName || '-';
  };

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
            sortable ? (
              <th key={name}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {name}
                  <SearchLink
                    params={getSortParams(name)}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', changeSortIcon(name))}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            ) : (
              <th key={name}>{name}</th>
            )
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
            <td>{getPersonLinkByName(person.motherName)}</td>
            <td>{getPersonLinkByName(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
