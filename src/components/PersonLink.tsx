import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface Props {
  person: Person
  people: Person[],
}

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const mother = people.filter(mom => mom.name === person.motherName)[0];
  const father = people.filter(dad => dad.name === person.fatherName)[0];
  const { slug } = useParams();
  const activeSlug = slug;

  const baba = () => {
    if (mother) {
      return <Link to={`/people/${mother?.slug}`} className={classNames({ 'has-text-danger': mother?.sex === 'f' })}>{mother?.name}</Link>;
    }

    return person.motherName || '-';
  };

  const dada = () => {
    if (father) {
      return <Link to={`/people/${father.slug}`}>{father.name}</Link>;
    }

    return person.fatherName || '-';
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === activeSlug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {baba()}
      </td>
      <td>
        {dada()}
      </td>
    </tr>
  );
};
