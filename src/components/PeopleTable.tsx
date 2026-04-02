import React from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  activeSlug?: string;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people, activeSlug }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSort = (sortParam: string) => {
    const params = new URLSearchParams(searchParams);

    if (params.get('sort') === sortParam && params.get('order') === 'desc') {
      params.delete('sort');
      params.delete('order');

      return setSearchParams(params);
    }

    if (params.get('sort') === sortParam) {
      params.set('order', 'desc');
    } else {
      params.set('sort', sortParam);
      params.delete('order');
    }

    setSearchParams(params);
  };

  const setSortIconClass = (param: string) => {
    if (param !== searchParams.get('sort')) {
      return 'fas fa-sort';
    }

    if (searchParams.get('order') === 'desc') {
      return 'fas fa-sort-down';
    } else {
      return 'fas fa-sort-up';
    }
  };

  return (
    <>
      {people.length === 0 ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <a
                    href="#/people?sort=name"
                    onClick={event => {
                      event.preventDefault();
                      onSort('name');
                    }}
                  >
                    <span className="icon">
                      <i className={setSortIconClass('name')} />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <a
                    href="#/people?sort=sex"
                    onClick={event => {
                      event.preventDefault();
                      onSort('sex');
                    }}
                  >
                    <span className="icon">
                      <i className={setSortIconClass('sex')} />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <a
                    href="#/people?sort=born&amp;order=desc"
                    onClick={event => {
                      event.preventDefault();
                      onSort('born');
                    }}
                  >
                    <span className="icon">
                      <i className={setSortIconClass('born')} />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <a
                    href="#/people?sort=died"
                    onClick={event => {
                      event.preventDefault();
                      onSort('died');
                    }}
                  >
                    <span className="icon">
                      <i className={setSortIconClass('died')} />
                    </span>
                  </a>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map(person => {
              const mother =
                person.motherName &&
                people.find(p => p.name === person.motherName);
              const father =
                person.fatherName &&
                people.find(p => p.name === person.fatherName);

              return (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={
                    person.slug === activeSlug ? 'has-background-warning' : ''
                  }
                >
                  <td>
                    <PersonLink person={person} />
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.motherName ? (
                      mother ? (
                        <PersonLink person={mother} />
                      ) : (
                        person.motherName
                      )
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {person.fatherName ? (
                      father ? (
                        <PersonLink person={father} />
                      ) : (
                        person.fatherName
                      )
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
