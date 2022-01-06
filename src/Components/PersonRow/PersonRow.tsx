import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { People } from '../../types/People';
import { PersonName } from '../PersonName/PersonName';

import './PersonRow.scss';

type Props = {
  people: People[],
  person: People,
};

const unknowName = () => (
  <span className="error-message">-unknown-</span>
);

export const PersonRow: React.FC<Props> = ({ people, person }) => {
  const mother = people.find(p => p.name === person.motherName) || null;
  const father = people.find(p => p.name === person.fatherName) || null;

  const params = useParams();

  return (
    <tr className={classNames({ 'person-row--active': person.slug === params['*'] })}>
      <th>
        <PersonName person={person} />
      </th>
      <th>
        {person.sex === 'm'
          ? <i className="fas fa-male" />
          : <i className="fas fa-female" /> }
      </th>
      <th>{person.born}</th>
      <th>{person.died}</th>
      <th>
        {father
          ? (
            <PersonName person={father} />
          ) : (
            person.fatherName || unknowName()
          )}
      </th>
      <th>
        {mother
          ? (
            <PersonName person={mother} />
          ) : (
            person.motherName || unknowName()
          )}
      </th>
    </tr>
  );
};
