import React from 'react';
import { Person } from '../types';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';

type PropsPerson = {
  person: Person;
  people: Person[];
};

export const PersonItem: React.FC<PropsPerson> = ({ person, people }) => {
  const { name, sex, born, died, motherName, fatherName, slug } = person;
  const { personSlug } = useParams();

  const location = useLocation();

  const nameInTable = (namePerson: string) => {
    return people.find(per => per.name === namePerson);
  };

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': personSlug === slug })}
    >
      <td>
        <Link
          to={`/people/${slug}${location.search}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherName === null ? (
          '-'
        ) : nameInTable(motherName) ? (
          <Link
            className="has-text-danger"
            to={`/people/${nameInTable(motherName)?.slug}${location.search}`}
          >
            {motherName}
          </Link>
        ) : (
          motherName
        )}
      </td>
      <td>
        {fatherName === null ? (
          '-'
        ) : nameInTable(fatherName) ? (
          <Link
            to={`/people/${nameInTable(fatherName)?.slug}${location.search}`}
          >
            {fatherName}
          </Link>
        ) : (
          fatherName
        )}
      </td>
    </tr>
  );
};
