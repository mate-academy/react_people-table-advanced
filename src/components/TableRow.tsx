import React from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person
  people: Person[];
  personSlug?:string;
};

export const TableRow:React.FC<Props> = ({ person, people, personSlug }) => {
  const {
    slug, sex, born, died, motherName, fatherName,
  } = person;

  const getParent = (parentName: string | null) => {
    return people.find(({ name }) => name === parentName) || null;
  };

  const mother = getParent(motherName);
  const father = getParent(fatherName);

  return (
    <tr
      key={slug}
      data-cy="person"
      className={cn(
        { 'has-background-warning': slug === personSlug },
      )}
    >
      <td><PersonLink person={person} /></td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {!motherName && ('-')}
        {motherName && mother
          ? (<PersonLink person={mother} />)
          : (motherName)}
      </td>

      <td>
        {!fatherName && ('-')}
        {fatherName && father
          ? (<PersonLink person={father} />)
          : (fatherName)}
      </td>
    </tr>
  );
};
