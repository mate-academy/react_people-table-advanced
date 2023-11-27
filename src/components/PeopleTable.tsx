import classNames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { updateSearch } from '../utils/MyImplementationOfSearchHelper';

type Props = {
  allPeople: Person[];
  people: Person[];
  slug: string;
};

export const PeopleTable: React.FC<Props> = ({ allPeople, people, slug }) => {
  const [searchParams] = useSearchParams();

  const thGenerator = (labelOr: string) => {
    const label = labelOr.toLocaleLowerCase();

    return (
      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          {labelOr}
          <Link
            to={{
              search: updateSearch({ sort: label }),
            }}
          >
            <span className="icon">
              <i className={classNames(
                'fas',
                { 'fa-sort': searchParams.get('sort') !== label },
                {
                  'fa-sort-up':
                  (searchParams.get('sort') === label
                  && !searchParams.get('order')),
                },
                {
                  'fa-sort-down':
                  (searchParams.get('sort') === label
                  && searchParams.get('order') === 'desc'),
                },
              )}
              />
            </span>
          </Link>
        </span>
      </th>
    );
  };

  const personRowRender = (person: Person) => {
    const findPerson = (personName: string) => {
      const someone = allPeople.find(somebody => somebody.name === personName);

      if (someone) {
        return (
          <PersonLink person={someone} />
        );
      }

      return personName;
    };

    return (
      <tr
        data-cy="person"
        key={person.slug}
        className={classNames(
          { 'has-background-warning': slug === person.slug },
        )}
      >
        <td>
          <Link
            to={`/people/${person.slug}`}
            className={classNames({ 'has-text-danger': person.sex === 'f' })}
          >
            {person.name}
          </Link>
        </td>
        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>{person.motherName ? findPerson(person.motherName) : '-'}</td>
        <td>{person.fatherName ? findPerson(person.fatherName) : '-'}</td>
      </tr>
    );
  };

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {thGenerator('Name')}
            {thGenerator('Sex')}
            {thGenerator('Born')}
            {thGenerator('Died')}
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {people.map(person => (
            personRowRender(person)
          ))}
        </tbody>
      </table>
      {(people.length === 0
        && (
          <p>
            There are no people matching the current search criteria
          </p>
        ))}
    </>
  );
};
