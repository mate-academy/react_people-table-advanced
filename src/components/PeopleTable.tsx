import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import React from 'react';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */

type PeopleTableProps = {
  people: Person[];
  sort: string;
  order: string;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  sort,
  order,
}) => {
  const { slug: selectedSlug } = useParams();
  const renderPerson = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const foundPerson = people.find(person => person.name === name);

    if (foundPerson) {
      return <PersonLink person={foundPerson} />;
    }

    return name;
  };

  const getSortParams = (field: string) => {
    if (sort === field && order === 'desc') {
      return {
        sort: null,
        order: null,
      };
    }

    if (sort === field && order !== 'desc') {
      return {
        sort: field,
        order: 'desc',
      };
    }

    if (sort !== field) {
      return {
        sort: field,
        order: null,
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
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

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderPerson(person.motherName)}</td>
            <td>{renderPerson(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
