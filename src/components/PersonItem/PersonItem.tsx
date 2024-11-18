import { FC, useContext } from 'react';
import cn from 'classnames';

import { Person } from '../../types';
import { PersonParent } from '../PersonParent/PersonParent';
import { PeopleContext } from '../../context/PeopleContext';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  person: Person;
}

export const PersonItem: FC<Props> = ({ person }) => {
  const { slug, sex, born, died, motherName, fatherName, mother, father } =
    person;

  const { personId } = useContext(PeopleContext);

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': personId === slug })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        <PersonParent parent={mother} parentName={motherName} />
      </td>
      <td>
        <PersonParent parent={father} parentName={fatherName} />
      </td>
    </tr>
  );
};
