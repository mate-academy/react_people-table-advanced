import React from 'react';
import { Person } from '../types/Person';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();

  const mother = people?.find(human => human.name === person.motherName);
  const father = people?.find(human => human.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <a
          href={`#/people/${person.slug}`}
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </a>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {mother ? (
        <td>
          <a className="has-text-danger" href={`#/people/${mother.slug}`}>
            {mother.name}
          </a>
        </td>
      ) : (
        <td>{person.motherName || '-'}</td>
      )}

      {father ? (
        <td>
          <a href={`#/people/${father.slug}`}>{father.name}</a>
        </td>
      ) : (
        <td>{person.fatherName || '-'}</td>
      )}
    </tr>
  );
};
