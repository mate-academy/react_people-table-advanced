import React from 'react';
import { Person } from '../../types';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { FilterType } from '../../types/FilterType';

type Props = {
  person: Person;
  getPeopleSlug: (parentName: string) => Person | undefined;
};

export const PersonLink: React.FC<Props> = ({ person, getPeopleSlug }) => {
  const { slug } = useParams();
  const getFatherSlug = getPeopleSlug(person.fatherName as string);
  const getMotherSlug = getPeopleSlug(person.motherName as string);

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === FilterType.FEMALE,
          })}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {person.motherName && getMotherSlug?.slug ? (
        <td>
          <Link
            to={`/people/${getMotherSlug.slug}`}
            className="has-text-danger"
          >
            {person.motherName}
          </Link>
        </td>
      ) : (
        <td>{person.motherName || '-'}</td>
      )}
      {person.fatherName && getMotherSlug?.slug ? (
        <td>
          <Link to={`/people/${getFatherSlug?.slug}`}>{person.fatherName}</Link>
        </td>
      ) : (
        <td>{person.fatherName || '-'}</td>
      )}
    </tr>
  );
};
