import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import React from 'react';

type Props = {
  person: Person;
  people: Person[];
  selectedPerson: string | null;
  onPersonSelect: (person: string) => void;
};

export const PersonLink: React.FC<Props> = ({
  person,
  people,
  selectedPerson,
  onPersonSelect,
}) => {
  const { name, sex, born, died, motherName, fatherName, slug } = person;

  const mother = people.find(p => p.name === motherName);
  const father = people.find(p => p.name === fatherName);

  const getLinkClass = classNames({ 'has-text-danger': sex === 'f' });

  return (
    <>
      <tr
        data-cy="person"
        className={
          selectedPerson === person.slug ? 'has-background-warning' : ''
        }
      >
        <td>
          <Link
            className={getLinkClass}
            to={`/people/${slug}`}
            onClick={() => onPersonSelect(person.slug)}
          >
            {name}
          </Link>
        </td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>
          {mother ? (
            <Link className="has-text-danger" to={`/people/${mother.slug}`}>
              {motherName}
            </Link>
          ) : (
            motherName || '-'
          )}
        </td>
        <td>
          {father ? (
            <Link to={`/people/${father.slug}`}>{fatherName}</Link>
          ) : (
            fatherName || '-'
          )}
        </td>
      </tr>
    </>
  );
};
