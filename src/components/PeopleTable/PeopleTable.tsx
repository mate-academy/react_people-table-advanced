/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams } from 'react-router-dom';
import { FC } from 'react';
import cn from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { PeopleTableHead } from '../PeopleTableHead';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug: paramsSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <PeopleTableHead />

      <tbody>
        {people.map(person => {
          const { slug, sex, born, died, motherName, fatherName } = person;
          const mother = people.find(({ name }) => name === motherName);
          const father = people.find(({ name }) => name === fatherName);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={cn({
                'has-background-warning': paramsSlug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>

              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
