import React from 'react';
import { Person } from './../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLinks: React.FC<Props> = ({ person, people }) => {
  const { slug: id } = useParams();

  const findPersonByName = (name: string | null) => {
    if (!name) {
      return;
    }

    return people.find((item: Person) => item.name === name);
  };

  const mother = findPersonByName(person.motherName);
  const father = findPersonByName(person.fatherName);

  const { slug, name, sex, born, died, motherName, fatherName } = person;

  // const peopleWithParents = people.reduce((newPeople: Person[], person) => {
  //   const mother = people.find(mama => mama.name === person.motherName);
  //   const father = people.find(papa => papa.name === person.fatherName);

  //   const updatedPerson = {
  //     ...person,
  //     mother,
  //     father,
  //   };

  //   newPeople.push(updatedPerson);

  //   return newPeople;
  // }, []);

  return (
    <tr
      data-cy="person"
      className={id === slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {mother ? (
        <td>
          <Link to={`/people/${mother.slug}`} className="has-text-danger">
            {motherName}
          </Link>
        </td>
      ) : (
        <td>{motherName ? motherName : '-'}</td>
      )}

      {father ? (
        <td>
          <Link to={`/people/${father.slug}`}>{fatherName}</Link>
        </td>
      ) : (
        <td>{fatherName ? fatherName : '-'}</td>
      )}
    </tr>
  );
};
