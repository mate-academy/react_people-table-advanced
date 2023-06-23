import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  people: Person[],
  slugPerson: string | undefined,
};

export const PeopleTable: React.FC<Props> = ({ people, slugPerson }) => {
  return (
    <>
      {people && people.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Sex</th>
              <th>Born</th>
              <th>Died</th>
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
                    <a
                      href={`#/people/${slug}`}
                      className={classNames(
                        { 'has-text-danger': sex === 'f' },
                      )}
                    >
                      {name}
                    </a>
                  </td>
                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>
                  <td>
                    {mother ? (
                      <a
                        href={`#/people/${mother?.slug}`}
                        className="has-text-danger"
                      >
                        {motherName}
                      </a>
                    ) : (
                      <p>{motherName || '-'}</p>
                    )}
                  </td>
                  <td>
                    {father ? (
                      <a
                        href={`#/people/${father?.slug}`}
                      >
                        {fatherName}
                      </a>
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
