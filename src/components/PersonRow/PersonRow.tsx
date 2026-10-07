import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { PersonLink } from '../PersonLink';

import type { Person } from '../../types';

type Props = {
  person: Person;
  mother: Person | null;
  father: Person | null;
};

export const PersonRow = ({ person, mother, father }: Props) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === person.slug })}
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
};
