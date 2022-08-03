// import { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from './react-app-env';

type Props = {
  person: Person,
  people: Person[],
  onSelectName: (name: string) => void,
};

export const PersonRow: React.FC<Props> = ({
  person, people, onSelectName,
}) => {
  const isMotherInPeople = people
    .some(person1 => person1.name === person.motherName);
  const isFatherInPeople = people
    .some(person1 => person1.name === person.fatherName);

  return (
    <>
      <th>
        <Link
          style={{
            color: person.sex === 'm' ? 'rgb(0, 71, 171)' : 'rgb(255, 0, 0)',
          }}
          to={`/people/${person.slug}`}
          className={classNames()}
          onClick={() => onSelectName(person.name)}
        >
          {person.name}
        </Link>
      </th>
      <th>{person.sex}</th>
      <th>{person.born}</th>
      <th>{person.died}</th>
      <th>
        {isMotherInPeople
          ? (
            <Link
              style={{
                color: 'rgb(255, 0, 0)',
              }}
              to={`/people/${person.slug}`}
              onClick={() => onSelectName(person.motherName)}
            >
              {person.motherName}
            </Link>
          )
          : (
            <p
              style={{
                fontWeight: 'bold',
              }}
            >
              {person.motherName}
            </p>
          )}
      </th>
      <th>
        {isFatherInPeople
          ? (
            <Link
              style={{
                color: 'rgb(0, 71, 171)',
              }}
              to={`/people/${person.slug}`}
              onClick={() => onSelectName(person.fatherName)}
            >
              {person.fatherName}
            </Link>
          )
          : (
            <p
              style={{
                fontWeight: 'bold',
              }}
            >
              {person.fatherName}
            </p>
          )}
      </th>
    </>
  );
};
