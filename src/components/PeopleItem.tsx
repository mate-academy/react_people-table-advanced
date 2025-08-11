import React, { useContext } from 'react';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { PeopleContext } from '../store/peopleContext';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PeopleItem: React.FC<Props> = ({ person }) => {
  const { persSlug } = useParams();
  const currPerson = { ...person };
  const { people } = useContext(PeopleContext);

  if (person.motherName) {
    currPerson.mother = people.find(p => p.name === person.motherName);
  }

  if (person.fatherName) {
    currPerson.father = people.find(p => p.name === person.fatherName);
  }

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': persSlug === currPerson.slug,
      })}
    >
      <td>
        <a
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
          href={`#/people/${currPerson.slug}`}
        >
          {currPerson.name}
        </a>
      </td>

      <td>{currPerson.sex}</td>
      <td>{currPerson.born}</td>
      <td>{currPerson.died}</td>

      <td>
        {currPerson.mother ? (
          <a
            className="has-text-danger"
            href={`#/people/${currPerson.mother?.slug}`}
          >
            {currPerson.motherName}
          </a>
        ) : currPerson.motherName ? (
          currPerson.motherName
        ) : (
          '-'
        )}
      </td>

      <td>
        {currPerson.father ? (
          <a href={`#/people/${currPerson.father.slug}`}>
            {currPerson.fatherName}
          </a>
        ) : currPerson.fatherName ? (
          currPerson.fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
