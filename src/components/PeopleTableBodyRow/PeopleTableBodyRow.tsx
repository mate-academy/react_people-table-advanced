import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types';
import { ExistingParent } from '../ExistindParent';

type Props = {
  person: Person,
};

export const PeopleTableBodyRow: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': person.slug === slug,
      })}
    >
      <PersonLink person={person} />
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <ExistingParent parent={person.mother} parentName={person.motherName} />
      <ExistingParent parent={person.father} parentName={person.fatherName} />
    </tr>
  );
};
