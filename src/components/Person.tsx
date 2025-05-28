import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonType } from '../types';

type Props = {
  person: PersonType;
  people: PersonType[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug, name, sex, born, died, motherName, fatherName } = person;
  const { slug: slugParam } = useParams();

  const getLink = (mName: string) => {
    const foundPerson = people.find(e => e.name === mName);

    if (foundPerson) {
      return (
        <NavLink
          className={cn({ 'has-text-danger': foundPerson.sex === 'f' })}
          to={`/people/${foundPerson.slug}`}
        >
          {mName}
        </NavLink>
      );
    }

    return <span>{mName}</span>;
  };

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slugParam === slug,
      })}
    >
      <td>
        <NavLink
          className={cn({ 'has-text-danger': sex === 'f' })}
          to={`/people/${slug}`}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName ? getLink(motherName) : '-'}</td>
      <td>{fatherName ? getLink(fatherName) : '-'}</td>
    </tr>
  );
};
