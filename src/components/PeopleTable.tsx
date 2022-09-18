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
    people.length > 0
      ? (
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
                      search: updateSearch({ sort: 'name' }),
                    }}
                  >
                    <span className="icon">
                      <i className={classNames(
                        'fas',
                        { 'fa-sort': searchParams.get('sort') !== 'name' },
                        {
                          'fa-sort-up':
                          (searchParams.get('sort') === 'name'
                          && !searchParams.get('order')),
                        },
                        {
                          'fa-sort-down':
                          (searchParams.get('sort') === 'name'
                          && searchParams.get('order') === 'desc'),
                        },
                      )}
                      />
                    </span>
                  </Link>
                </span>
              </th>

              {thGenerator('Sex')}
              {/* <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <a href="#/people?sort=sex">
                    <span className="icon">
                      <i className="fas fa-sort-down" />
                    </span>
                  </a>
                </span>
                      </th> */}

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <a href="#/people?sort=born&amp;order=desc">
                    <span className="icon">
                      <i className="fas fa-sort-up" />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <a href="#/people?sort=died">
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                </span>
              </th>

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
      )
      : (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )
  );
};
