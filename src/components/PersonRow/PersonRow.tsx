import React from 'react';
import classNames from 'classnames';

import './PersonRow.scss';

import PersonName from '../PersonName';

type Props = {
  person: Person,
  personSelected: string,
};

export const PersonRow: React.FC<Props> = ({ person, personSelected }) => {
  const { mother, father } = person;

  return (
    <tr className={classNames({ 'PersonRow--selected': person.slug === personSelected })}>
      <td><PersonName name={person.name} slug={person.slug} sex={person.sex} /></td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother
          ? <PersonName name={mother.name} slug={mother.slug} sex={mother.sex} />
          : <b>name</b>}
      </td>
      <td>
        {father
          ? <PersonName name={father.name} slug={father.slug} sex={father.sex} />
          : <b>name</b>}
      </td>
    </tr>
  );
};
