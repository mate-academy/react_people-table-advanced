import React from 'react';
import { Person } from './../../types';
import cn from 'classnames';

import { NavLink } from 'react-router-dom';

type Props = {
  person: Person;
  people: Person[];
  selectedSlug: string | undefined;
};

export const PersonLink: React.FC<Props> = ({
  person,
  people,
  selectedSlug,
}) => {
  const { name, sex, born, died, motherName, fatherName, slug } = person;

  const findNameInList = (checkName: string) => {
    return people.find(man => man.name === checkName);
  };

  const fillParentCell = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = findNameInList(parentName);

    return parent ? (
      <NavLink
        to={`/people/${parent.slug}`}
        className={cn({ 'has-text-danger': parent.sex === 'f' })}
      >
        {parentName}
      </NavLink>
    ) : (
      parentName
    );
  };

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === selectedSlug,
      })}
    >
      <td>
        <NavLink
          to={`/people/${slug}`}
          className={cn({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{fillParentCell(motherName)}</td>
      <td>{fillParentCell(fatherName)}</td>
    </tr>
  );
};
