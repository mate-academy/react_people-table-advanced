import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
  activePerson: string;
  setActivePerson: (valuse: string) => void;
};

export const PersonInfo:React.FC<Props> = ({
  person,
  people,
  activePerson,
  setActivePerson,
}) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  } = person;

  const mother = people.find(parent => person.motherName === parent.name);
  const father = people.find(parent => person.fatherName === parent.name);

  const location = useLocation();

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': activePerson === slug },
      )}
    >
      <td>
        <Link
          to={`/people/${slug}/${location.search}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
          onClick={() => setActivePerson(slug)}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <Link
              to={`/people/${mother.slug}/${location.search}`}
              className="has-text-danger"
              onClick={() => setActivePerson(mother.slug)}
            >
              {motherName}
            </Link>
          )
          : (<>{motherName || '-'}</>)}
      </td>
      <td>
        {father
          ? (
            <Link
              to={`/people/${father.slug}/${location.search}`}
              onClick={() => setActivePerson(father.slug)}
            >
              {fatherName}
            </Link>
          )
          : (<>{fatherName || '-'}</>)}
      </td>
    </tr>
  );
};
