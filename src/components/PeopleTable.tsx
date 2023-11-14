import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;
  const getSortIcon = (fieldName: string) => {
    if (!sort || sort !== fieldName) {
      return {
        sort: fieldName,
      };
    }

    if (sort === fieldName && !order) {
      return {
        sort: fieldName,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const getParent = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const parentName = people.find(person => person.name === name);

    if (parentName) {
      return <PersonLink person={parentName} />;
    }

    return name;
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
                params={getSortIcon('name') as SearchParams}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': sort === 'name' && !order,
                    'fa-sort-down': sort === 'name' && order,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={getSortIcon('sex') as SearchParams}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': sort === 'sex' && !order,
                    'fa-sort-down': sort === 'sex' && order,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={getSortIcon('born') as SearchParams}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': sort === 'born' && !order,
                    'fa-sort-down': sort === 'born' && order,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={getSortIcon('died') as SearchParams}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': sort === 'died' && !order,
                    'fa-sort-down': sort === 'died' && order,
                  })}
                  />
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
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getParent(person.motherName)}</td>
            <td>{getParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
