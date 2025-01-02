import React from 'react';
import cn from 'classnames';
import { Person } from '../../../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
};

const NO_PARENT = '-';

export const TableRow: React.FC<Props> = props => {
  const { person } = props;
  const { name, sex, born, died, fatherName, motherName, mother, father } =
    person;

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <PersonLink name={name} sex={sex} slug={person.slug} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother ? (
          <PersonLink name={mother.name} sex={mother.sex} slug={mother.slug} />
        ) : (
          motherName || NO_PARENT
        )}
      </td>

      <td>
        {father ? (
          <PersonLink name={father.name} sex={father.sex} slug={father.slug} />
        ) : (
          fatherName || NO_PARENT
        )}
      </td>
    </tr>
  );
};
