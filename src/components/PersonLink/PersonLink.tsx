import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  selectedPerson: string | null;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({
  person,
  selectedPerson,
  people,
}) => {
  const { name, sex, born, died, fatherName, motherName, slug } = person;

  const findPerson = (relativeName: string) =>
    people.find(chosenPerson => chosenPerson.name === relativeName);

  const renderParent = (parentName: string | null, relationship: string) => {
    if (!parentName) {
      return '-';
    }

    const foundPerson = findPerson(parentName);

    if (!foundPerson) {
      return parentName;
    }

    return (
      <Link
        to={`/people/${foundPerson.slug}`}
        className={cn({ 'has-text-danger': relationship === 'mother' })}
      >
        {parentName}
      </Link>
    );
  };

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': selectedPerson === slug })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={cn({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{renderParent(motherName, 'mother')}</td>
      <td>{renderParent(fatherName, 'father')}</td>
    </tr>
  );
};
