import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person;
  people: Person[];
  selectedPerson: string | null;
};

export const PersonLink: React.FC<Props> = ({
  person,
  people,
  selectedPerson,
}) => {
  const { name, sex, born, died, fatherName, motherName, slug } = person;

  const findParent = (parentName: string) =>
    people.find(({ name: curName }) => curName === parentName);

  const renderParent = (parentName: string | null, status: string) => {
    if (!parentName) {
      return '-';
    }

    const foundedParent = findParent(parentName);

    if (!foundedParent) {
      return parentName;
    }

    return (
      <Link
        to={`/people/${foundedParent.slug}`}
        className={classNames({ 'has-text-danger': status === 'mother' })}
      >
        {parentName}
      </Link>
    );
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPerson === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
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
