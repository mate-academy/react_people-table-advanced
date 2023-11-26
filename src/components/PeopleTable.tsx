import React from 'react';
import cn from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;
  const { slug } = useParams();

  const getSortParams = (paramsName: string) => {
    const sortParams: SearchParams = {
      sort: null,
      order: null,
    };

    if (!sort || sort !== paramsName) {
      sortParams.sort = paramsName;
    }

    if (!order && sort === paramsName) {
      sortParams.sort = paramsName;
      sortParams.order = 'desc';
    }

    return sortParams;
  };

  const getParent = (parentName: string | null) => {
    return people.find((parent) => parent.name === parentName);
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
              <Link
                to={{
                  search: getSearchWith(searchParams, getSortParams('name')),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas fa-sort', {
                      'fa-sort-up': sort === 'name' && !order,
                      'fa-sort-down': sort === 'name' && order,
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search: getSearchWith(searchParams, getSortParams('sex')),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas fa-sort', {
                      'fa-sort-up': sort === 'sex' && !order,
                      'fa-sort-down': sort === 'sex' && order,
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search: getSearchWith(searchParams, getSortParams('born')),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas fa-sort', {
                      'fa-sort-up': sort === 'born' && !order,
                      'fa-sort-down': sort === 'born' && order,
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  search: getSearchWith(searchParams, getSortParams('died')),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas fa-sort', {
                      'fa-sort-up': sort === 'died' && !order,
                      'fa-sort-down': sort === 'died' && order,
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => {
          const mother = getParent(person.motherName);
          const father = getParent(person.fatherName);

          return (
            <tr
              data-cy="person"
              className={cn({
                'has-background-warning': person.slug === slug,
              })}
              key={person.name}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
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
