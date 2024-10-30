import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

const findPersonInArray = (peopleArray: Person[], personName: string) => {
  return peopleArray.find(person => person.name === personName);
};

interface Props {
  people: Person[];
}

export const PersonRender: React.FC<Props> = ({ people }) => {
  const [selectedSlug, setSelectedSlug] = useState('');
  const { peopleId } = useParams();
  const selectedId = peopleId || '';

  const renderPerentName = (name: string) => {
    if (name) {
      if (findPersonInArray(people, name)) {
        return (
          <Link
            className={cn({
              'has-text-danger': findPersonInArray(people, name)!.sex === 'f',
            })}
            to={`/people/${findPersonInArray(people, name)!.slug}`}
          >
            {name}
          </Link>
        );
      } else {
        return name;
      }
    }

    return '-';
  };

  useEffect(() => {
    setSelectedSlug(selectedId);
  }, [selectedId]);

  return (
    <>
      {people.map(person => (
        <tr
          key={person.slug}
          data-cy="person"
          className={cn({
            'has-background-warning': selectedSlug === person.slug,
          })}
        >
          <td>
            <Link
              className={cn({
                'has-text-danger': person.sex === 'f',
              })}
              to={`../${person.slug}`}
            >
              {person.name}
            </Link>
          </td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>{renderPerentName(person.motherName!)}</td>
          <td>{renderPerentName(person.fatherName!)}</td>
        </tr>
      ))}
    </>
  );
};
