/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

const makeGoodList = (people: Person[], part?: string, order?: string) => {
  const correctPeopleList = people;

  if (part && order) {
    switch (part) {
      case 'name':
      case 'sex':
        correctPeopleList.sort((a: Person, b: Person) =>
          b[`${part}`].localeCompare(a[`${part}`]),
        );

        return correctPeopleList;

      case 'born':
      case 'died':
        correctPeopleList.sort((a, b) => b[`${part}`] - a[`${part}`]);

        return correctPeopleList;

      default:
        return correctPeopleList;
    }
  }

  if (part && !order) {
    switch (part) {
      case 'name':
      case 'sex':
        correctPeopleList.sort((a: Person, b: Person) =>
          a[`${part}`].localeCompare(b[`${part}`]),
        );

        return correctPeopleList;

      case 'born':
      case 'died':
        correctPeopleList.sort((a, b) => a[`${part}`] - b[`${part}`]);

        return correctPeopleList;

      default:
        return correctPeopleList;
    }
  }

  if (!part && !order) {
    return correctPeopleList;
  }

  return correctPeopleList;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const findParent = (parentName: string | null) => {
    const parent = people.find(p => p.name === parentName);

    return parent ? <PersonLink person={parent} /> : parentName;
  };

  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const { slug } = useParams();

  const selectedPerson = slug;

  const handlePartChange = (field: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort && order) {
      params.delete(order);
      params.delete(sort);
      makeGoodList(people, sort, order);
    }

    if (!sort) {
      params.set(sort, field);
      makeGoodList(people, sort, order);
    }

    if (sort && !order) {
      params.set(order, 'desc');
      makeGoodList(people, sort, order);
    }

    setSearchParams(params);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <p> {pathname} </p>
      <p> {searchParams.toString()} </p>
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <Link
                to={{
                  pathname: searchParams.toString(),
                  // search: searchParams.toString(),
                }}
                state={searchParams.toString()}
                onClick={() => {
                  handlePartChange('name');
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to="#/people?sort=sex"
                onClick={() => {
                  handlePartChange('sex');
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to="#/people?sort=born&amp;order=desc"
                onClick={() => {
                  handlePartChange('born');
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to="#/people?sort=died"
                onClick={() => {
                  handlePartChange('died');
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
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
            key={person.slug}
            className={cn({
              'has-background-warning': person.slug === selectedPerson,
            })}
          >
            <td>
              <Link
                to={`../${person.slug}`}
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
            <td> {person.motherName ? findParent(person.motherName) : '-'} </td>
            <td> {person.fatherName ? findParent(person.fatherName) : '-'} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
