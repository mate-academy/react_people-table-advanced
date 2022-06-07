import React, { useContext, useMemo } from 'react';

import './PersonRow.scss';
import { PeopleContext } from '../PeopleContext';
import { PersonName } from '../PersonName';

type Props = {
  person: Person;
};

export const PersonRow:React.FC<Props> = ({ person }) => {
  const { people } = useContext(PeopleContext);

  const mother = useMemo(() => {
    return people.find(item => item.name === person.motherName);
  }, [people]);

  const father = useMemo(() => {
    return people.find(item => item.name === person.fatherName);
  }, [people]);

  return (
    <>
      <td className="cell"><PersonName person={person} /></td>
      <td className="cell cell-center">{person.sex}</td>
      <td className="cell cell-center">{person.born}</td>
      <td className="cell cell-center">{person.died}</td>
      {mother
        ? (
          <td className="cell"><PersonName person={mother} /></td>
        )
        : (
          <td className="cell cell-bold">{person.motherName || 'no data'}</td>
        )}
      {father
        ? (
          <td className="cell"><PersonName person={father} /></td>
        )
        : (
          <td className="cell cell-bold">{person.fatherName || 'no data'}</td>
        )}
    </>
  );
};
