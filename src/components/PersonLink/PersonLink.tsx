import React from 'react';
import { Person } from '../../types';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

type Props = {
  person: Person;
  people: Person[];
};

function getParams(personName: string | null, personBorn: number | undefined) {
  if (personName && personBorn) {
    return `${personName.toLocaleLowerCase().split(' ').join('-')}-${personBorn}`;
  }

  return '';
}

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { personName } = useParams();
  const params = getParams(person.name, person.born);

  const allNames = people?.map(human => human.name);

  const hasMotherInList = allNames.includes(person.motherName || '');
  const hasFatherInList = allNames.includes(person.fatherName || '');

  const mother = hasMotherInList
    ? people.find(human => human.name === person.motherName)
    : null;

  const father = hasFatherInList
    ? people.find(human => human.name === person.fatherName)
    : null;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personName === params,
      })}
    >
      <td>
        <Link
          to={`/people/${params}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {hasMotherInList && mother ? (
          <Link
            className="has-text-danger"
            to={`/people/${getParams(person.motherName, mother.born)}`}
          >
            {person.motherName}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>

      <td>
        {hasFatherInList && father ? (
          <Link to={`/people/${getParams(person.fatherName, father.born)}`}>
            {person.fatherName}
          </Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
