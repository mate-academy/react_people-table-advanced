import React, { useContext } from 'react';
import { IPerson } from '../../types';
import { Link, useParams } from 'react-router-dom';
import { PeopleContext } from '../../storage/PeopleContext';
import classNames from 'classnames';

export const Person: React.FC<IPerson> = ({
  name,
  sex,
  born,
  died,
  fatherName,
  motherName,
  slug,
}) => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('context does not exist');
  }

  const { state } = context;
  const { slug: selectedSlug } = useParams();

  const foundFather = state.people.find(person => person.name === fatherName);
  const foundMother = state.people.find(person => person.name === motherName);

  const femaleClass = classNames({ 'has-text-danger': sex === 'f' });

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedSlug === slug,
      })}
    >
      <td>
        <Link className={femaleClass} to={`/people/${slug}`}>
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {foundMother ? (
          <Link className={femaleClass} to={`/people/${foundMother.slug}`}>
            {foundMother.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {foundFather ? (
          <Link to={`/people/${foundFather.slug}`}>{foundFather.name}</Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
