import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortLink } from './SortLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  const getPersonByName = (name: string) => {
    return people.find(person => person.name === name);
  };

  const getPersonParent = (name: string | null): JSX.Element => {
    const personParent = name && getPersonByName(name);

    return (name ? (
      <>
        {personParent
          ? (
            <PersonLink person={personParent} />
          ) : (
            <>
              {name}
            </>
          )}
      </>
    ) : (
      <>
        -
      </>
    ));
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable
                    is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SortLink sortBy="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink sortBy="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink sortBy="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink sortBy="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === personSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {getPersonParent(person.motherName)}
            </td>
            <td>
              {getPersonParent(person.fatherName)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
