import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { PersonLink } from '../Links/PersonLink';

type Props = {
  person: Person
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <>
      <tr className={classNames({ 'is-selected': slug === person.slug })}>
        <th>
          <PersonLink person={person} />
        </th>
        <th>{person.sex}</th>
        <th>{person.born}</th>
        <th>{person.died}</th>
        {!person.father
          ? (<th>{person.fatherName}</th>)
          : (
            <th>
              <PersonLink person={person.father} />
            </th>
          )}
        {!person.mother
          ? (<th>{person.motherName}</th>)
          : (
            <th>
              <PersonLink person={person.mother} />
            </th>
          )}
      </tr>
    </>

  );
};
