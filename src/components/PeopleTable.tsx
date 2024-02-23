/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import '../App.scss';

type Props = {
  people: Person[];
  match: (status: boolean) => void;
};

const makeGoodList = (
  people: Person[],
  part?: string,
  order?: string,
  sex?: string,
  query?: string,
  centuries?: string[],
) => {
  const filter = () => {
    let filteredList = [...people];

    if (sex) {
      filteredList = filteredList.filter(person => person.sex === sex);
    }

    if (query) {
      filteredList = filteredList.filter(
        person =>
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName
            ?.toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()) ||
          person.fatherName
            ?.toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()),
      );
    }

    filteredList =
      centuries?.length && centuries.length > 0
        ? filteredList.filter(person =>
          centuries.includes(Math.ceil(Number(person.born) / 100).toString()),
        )
        : filteredList;

    return filteredList;
  };

  const correctPeopleList = filter();

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

  if (!part && !order && !sex && !query && !centuries) {
    return people;
  }

  return correctPeopleList;
};

export const PeopleTable: React.FC<Props> = ({ people, match }) => {
  const findParent = (parentName: string | null) => {
    const parent = people.find(p => p.name === parentName);

    return parent ? <PersonLink person={parent} /> : parentName;
  };

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const { slug } = useParams();

  const selectedPerson = slug;

  const returnedPeople = makeGoodList(
    people,
    sort,
    order,
    sex,
    query,
    centuries,
  );

  if (returnedPeople.length === 0 && people) {
    match(true);
  }

  if (returnedPeople.length > 0) {
    match(false);
  }

  const handlePartChange = (field: string) => {
    if (sort && order && field === sort) {
      return {
        sort: null,
        order: null,
      };
    }

    if (!sort || order || field !== sort) {
      return {
        sort: field,
        order: null,
      };
    }

    if (sort && !order) {
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

  return (
    <table
      data-cy="peopleTable"
      className={cn(
        'table',
        'is-striped',
        'is-hoverable',
        'is-narrow',
        'is-fullwidth',
        {
          hidden: returnedPeople.length === 0,
        },
      )}
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink
                params={{
                  ...handlePartChange('name'),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !sort || sort !== 'name',
                      'fa-sort-up': sort === 'name' && !order,
                      'fa-sort-down': sort && order,
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
                params={{
                  ...handlePartChange('sex'),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !sort || sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && !order,
                      'fa-sort-down': sort && order,
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
                params={{
                  ...handlePartChange('born'),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !sort || sort !== 'born',
                      'fa-sort-up': sort === 'born' && !order,
                      'fa-sort-down': sort && order,
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
                params={{
                  ...handlePartChange('died'),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !sort || sort !== 'died',
                      'fa-sort-up': sort === 'died' && !order,
                      'fa-sort-down': sort && order,
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
        {returnedPeople.map(person => (
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
