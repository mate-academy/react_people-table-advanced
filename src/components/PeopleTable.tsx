import classNames from 'classnames';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { getSearchWith } from '../utils/searchHelper';

import { Person } from '../types/Person';

type TheadLinkProps = {
  to: string
  text: string
  sort: string
  order: string
  searchParams: URLSearchParams;
};

const TheadLink: React.FC<TheadLinkProps> = ({
  to,
  text,
  sort,
  order,
  searchParams,
}) => (
  <th>
    <span className="is-flex is-flex-wrap-nowrap">
      {text}
      <Link
        to={sort === text.toLocaleLowerCase()
          ? {
            search: order
              ? getSearchWith(searchParams, { sort: null, order: null })
              : getSearchWith(searchParams, { order: 'desc' }),
          }
          : { search: getSearchWith(searchParams, { sort: to, order: null }) }}
      >
        <span className="icon">
          {(sort !== text.toLocaleLowerCase()
            && <i className="fas fa-sort" />) || (
            !order
              ? <i className="fas fa-sort-up" />
              : <i className="fas fa-sort-down" />
          )}

        </span>
      </Link>
    </span>
  </th>
);

type Props = {
  persons: Person[];
  searchParams: URLSearchParams;
};

export const PeopleTable: React.FC<Props> = ({
  persons,
  searchParams,
}) => {
  const { selectedPersone } = useParams();
  const getPersoneInfo = (persone: Person) => `${persone.name.toLowerCase().split(' ').join('-')}-${persone.born}`;
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const search = window.location.hash
    .slice(window.location.hash.lastIndexOf('?'));

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <TheadLink
            to="name"
            text="Name"
            sort={sort}
            order={order}
            searchParams={searchParams}
          />

          <TheadLink
            to="sex"
            text="Sex"
            sort={sort}
            order={order}
            searchParams={searchParams}
          />

          <TheadLink
            to="born"
            text="Born"
            sort={sort}
            order={order}
            searchParams={searchParams}
          />

          <TheadLink
            to="died"
            text="Died"
            sort={sort}
            order={order}
            searchParams={searchParams}
          />

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {persons.map((persone) => {
          const {
            name,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = persone;

          const father = persons
            .find(person => person.name === fatherName);
          const mother = persons
            .find(person => person.name === motherName);

          const parentOnServer = (
            parent: Person | undefined,
            parentName: string | null,
            sexParent: string,
          ) => (
            parent
              ? (
                <td>
                  <Link
                    to={`${getPersoneInfo(parent)}${search}`}
                    className={classNames(
                      { 'has-text-danger': sexParent === 'f' },
                    )}
                  >
                    {parentName || '-'}
                  </Link>
                </td>
              )
              : <td>{parentName || '-'}</td>
          );

          return (
            <tr
              data-cy="person"
              key={name}
              className={classNames(
                { 'has-background-warning': selectedPersone === `${getPersoneInfo(persone)}` },
              )}
            >
              <td>
                <Link
                  to={`${getPersoneInfo(persone)}${search}`}
                  className={classNames(
                    { 'has-text-danger': sex === 'f' },
                  )}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {
                parentOnServer(mother, motherName, 'f')
              }
              {
                parentOnServer(father, fatherName, 'm')
              }
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
