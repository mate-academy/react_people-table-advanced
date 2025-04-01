import React, { useMemo } from 'react';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const findPersonByName = useMemo(() => {
    return (name: string | null): Person | null => {
      if (!name) return null;
      return people.find(person => person.name === name) || null;
    };
  }, [people]);

  return (
    <>
      {people.map(person => {
        const motherPerson = findPersonByName(person.motherName);
        const fatherPerson = findPersonByName(person.fatherName);

        return (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} name={person.name} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink
                person={motherPerson}
                name={person.motherName || '-'}
              />
            </td>
            <td>
              <PersonLink
                person={fatherPerson}
                name={person.fatherName || '-'}
              />
            </td>
          </tr>
        );
      })}
    </>
  );
};
