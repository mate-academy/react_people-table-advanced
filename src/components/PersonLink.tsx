import classNames from 'classnames';
import { Person } from '../types/Person';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

type Props = {
  person: Person;
  allNames: { [key: string]: Person };
  highlightedName: string | null;
  setHighlightedName: (name: string) => void;
  searchParams: URLSearchParams;
};

export const PersonLink: React.FC<Props> = ({
  person,
  allNames,
  highlightedName,
  setHighlightedName,
  searchParams,
}) => {
  const { name, sex, born, died, mother, father, fatherName, motherName } =
    person;
  const navigate = useNavigate();

  const getClassName = (personName: string | null | undefined) => {
    if (personName && allNames[personName]) {
      return allNames[personName].sex === 'f'
        ? 'has-text-danger'
        : 'has-text-link';
    }

    return '';
  };

  const handleClick = (personName: string | null | undefined) => {
    if (personName && allNames[personName]) {
      const url = `/people/${allNames[personName].slug}?${searchParams.toString()}`;

      navigate(url);
      setHighlightedName(allNames[personName].slug);
    }
  };

  const getPersonLink = (personName: string | null | undefined) => {
    if (personName && allNames[personName]) {
      return (
        <span
          className={getClassName(personName)}
          onClick={() => handleClick(personName)}
          style={{ cursor: 'pointer' }}
        >
          {personName}
        </span>
      );
    }

    return personName || '-';
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': highlightedName === person.slug,
      })}
    >
      <td onClick={() => handleClick(name)}>
        <Link
          to={`/people/${person.slug}?${searchParams.toString()}`}
          className={classNames({
            'has-text-danger': sex === 'f',
            'has-text-link': sex === 'm',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{getPersonLink(mother?.name || motherName)}</td>
      <td>{getPersonLink(father?.name || fatherName)}</td>
    </tr>
  );
};
