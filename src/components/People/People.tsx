import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';
import { SortLink } from '../SortLink';

type Props = {
  people: Person[];
};

export const People: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const realSlug = slug ?? null;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <SortLink sortField="name">Name</SortLink>
          </th>
          <th>
            <SortLink sortField="sex">Sex</SortLink>
          </th>
          <th>
            <SortLink sortField="born">Born</SortLink>
          </th>
          <th>
            <SortLink sortField="died">Died</SortLink>
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
            className={classNames({
              'has-background-warning': person.slug === realSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother
                ? (
                  <PersonLink person={person.mother} />
                ) : (
                  person.motherName || '-'
                )}
            </td>
            <td>
              {person.father
                ? (
                  <PersonLink person={person.father} />
                ) : (
                  person.fatherName || '-'
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
