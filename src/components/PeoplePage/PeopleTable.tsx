import React, { useState } from 'react';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useNavigation } from '../NavigationContext/NavigationContext';
import { useLocation } from 'react-router-dom';
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { selected } = useNavigation();
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredName, setIsHoveredName] = useState('');
  const location = useLocation();

  return people.map((person: Person) => {
    const mother = people.find(p => p.name === person.motherName);
    const father = people.find(p => p.name === person.fatherName);

    return (
      <tr
        onMouseEnter={() => {
          setIsHovered(true);
          setIsHoveredName(person.name);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsHoveredName('');
        }}
        data-cy="person"
        key={person.name}
        className={classNames({
          'has-background-warning':
            location.pathname === `/people/${person.slug}`,
          'has-background-grey-lighter':
            isHovered &&
            isHoveredName === person.name &&
            selected !== person.name,
        })}
      >
        <td>
          <PersonLink person={person} onHover={setIsHovered} />
        </td>

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>
          {mother ? (
            <PersonLink person={mother} onHover={setIsHovered} />
          ) : (
            person.motherName || '-'
          )}
        </td>
        <td>
          {father ? (
            <PersonLink person={father} onHover={setIsHovered} />
          ) : (
            person.fatherName || '-'
          )}
        </td>
      </tr>
    );
  });
};
