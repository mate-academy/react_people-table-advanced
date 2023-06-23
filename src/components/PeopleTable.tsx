import { FC } from 'react';
import classNames from 'classnames';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';

import { Person } from '../types';

type Props = {
  people: Person[],
  slugPerson: string | undefined,
};

export const PeopleTable: FC<Props> = ({ people, slugPerson }) => {
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  return (
    <>
      {people && people.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <a href="#/people?sort=name">
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <a href="#/people?sort=sex">
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                </span>
              </th>

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
            {people.map((person) => {
              const {
                name,
                sex,
                born,
                died,
                fatherName,
                motherName,
                slug,
              } = person;
              const mother = people.find(
                (child) => (child.motherName === person.name),
              );
              const father = people.find(
                (child) => (child.fatherName === person.name),
              );

              return (
                <tr
                  data-cy="person"
                  className={
                    classNames(
                      { 'has-background-warning': person.slug === slugPerson },
                    )
                  }
                >
                  <td>
                    <Link
                      to={{
                        pathname: parentPath + slug,
                        search: location.search,
                      }}
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
                  <td>
                    {mother ? (
                      <Link
                        to={{
                          pathname: parentPath + mother?.slug,
                          search: location.search,
                        }}
                        className="has-text-danger"
                      >
                        {motherName}
                      </Link>
                    ) : (
                      <p>{motherName || '-'}</p>
                    )}
                  </td>
                  <td>
                    {father ? (
                      <Link
                        to={{
                          pathname: parentPath + father?.slug,
                          search: location.search,
                        }}
                      >
                        {fatherName}
                      </Link>
                    ) : (
                      <p>{fatherName || '-'}</p>
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
