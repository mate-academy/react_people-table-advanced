import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';
import { PeopleContext } from '../../store/PeopleContext';

type Props = {
  person: Person;
};

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const { visiblePeople } = useContext(PeopleContext);
  const { slug } = useParams();

  const findPersoninList = (parentName: string | null) => {
    return visiblePeople.find(human => human.name === parentName) || null;
  };

  const mother = findPersoninList(person.motherName);
  const father = findPersoninList(person.fatherName);

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
};
