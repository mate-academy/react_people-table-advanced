import React, { useState } from 'react';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredName, setIsHoveredName] = useState('');
  const location = useLocation();

  return (
    <>
      {people.map(person => {
        const mother = people.find(p => p.name === person.motherName);
        const father = people.find(p => p.name === person.fatherName);

        return (
          <tr
            key={person.slug}
            data-cy="person"
            onMouseEnter={() => {
              setIsHovered(true);
              setIsHoveredName(person.name);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsHoveredName('');
            }}
            className={classNames({
              'has-background-warning':
                location.pathname === `/people/${person.slug}`,
              'has-background-grey-lighter':
                isHovered && isHoveredName === person.name,
            })}
          >
            <td>
              <PersonLink
                person={person}
                onHover={() => {
                  setIsHovered(true);
                  setIsHoveredName(person.name);
                }}
              />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                mother ? (
                  <PersonLink
                    person={mother}
                    onHover={() => {
                      setIsHovered(true);
                      setIsHoveredName(person.motherName!);
                    }}
                  />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                father ? (
                  <PersonLink
                    person={father}
                    onHover={() => {
                      setIsHovered(true);
                      setIsHoveredName(person.fatherName!);
                    }}
                  />
                ) : (
                  person.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        );
      })}
    </>
  );
};
