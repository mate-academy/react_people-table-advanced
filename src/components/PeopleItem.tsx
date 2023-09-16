import React from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  human: Person,
  people: Person[],
};

export const PeopleItem: React.FC<Props> = ({
  human,
  people,
}) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother = people.find(pers => pers.name === motherName),
    father = people.find(pers => pers.name === fatherName),
  } = human;

  const { slugName } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === slugName })}
    >
      <td>
        <Link
          to={`../${slug}`}
          className={cn({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {mother ? (
        <td>
          <Link to={`../${mother.slug}`} className="has-text-danger">
            {mother.name}
          </Link>
        </td>
      ) : (
        <td>{motherName || '-'}</td>
      )}

      {father ? (
        <td>
          <Link to={`${father.slug}`}>
            {father.name}
          </Link>
        </td>
      ) : (
        <td>{fatherName || '-'}</td>
      )}
    </tr>
  );
};
