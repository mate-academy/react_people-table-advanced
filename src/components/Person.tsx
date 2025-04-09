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
    let result = <span>{mName}</span>;

    people.find(e => {
      if (e.name === mName) {
        result = (
          <NavLink
            className={cn({ 'has-text-danger': e.sex === 'f' })}
            to={`/people/${e.slug}`}
          >
            {mName}
          </NavLink>
        );
      }
    });

    return result;
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
