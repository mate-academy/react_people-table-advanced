import { Person } from '../../types';
import cn from 'classnames';
import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StateContext } from '../../GlobalProvider';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { personName } = useParams();
  const { peopleList } = useContext(StateContext);

  const normalizePersonName = (name: string) => {
    const born = peopleList.find(persona => persona.name === name)?.born;

    return `${name} ${born}`.replaceAll(' ', '-').toLowerCase();
  };

  const isPersonExist = (name: string) => {
    return peopleList.some(persona => persona.name === name);
  };

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': personName?.includes(
          normalizePersonName(person.name),
        ),
      })}
    >
      <td>
        <Link
          to={`./${normalizePersonName(person.name)}`}
          className={cn({
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
        {person.motherName && isPersonExist(person.motherName) ? (
          <Link
            className="has-text-danger"
            to={`./${normalizePersonName(person.motherName)}`}
          >
            {person.motherName}
          </Link>
        ) : person.motherName ? (
          <p>{person.motherName}</p>
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.fatherName && isPersonExist(person.fatherName) ? (
          <Link to={`./${normalizePersonName(person.fatherName)}`}>
            {person.fatherName}
          </Link>
        ) : person.fatherName ? (
          <p>{person.fatherName}</p>
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
