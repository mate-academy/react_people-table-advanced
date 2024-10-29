import { FC } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { PersonLink } from '../PersonLink';
import { Person } from '../../types';

interface Props {
  people: Person[];
}

export const PeopleList: FC<Props> = ({ people }) => {
  const { slug } = useParams();

  return (
    <tbody>
      {people.map(person => {
        const mother = people.find(({ name }) => name === person.motherName);
        const father = people.find(({ name }) => name === person.fatherName);

        return (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {mother ? (
                <PersonLink person={mother} />
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {father ? (
                <PersonLink person={father} />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
