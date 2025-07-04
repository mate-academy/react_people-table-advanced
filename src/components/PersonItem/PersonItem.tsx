import React from 'react';
import { Person } from '../../types';
import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  person: Person;
  personMatch: boolean;
};

const PersonItem: React.FC<Props> = ({ person, personMatch }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;
  const { search } = useLocation();
  const navigate = useNavigate();

  const renderPersonLink = (parent: Person | undefined) => {
    const isWoman = parent?.sex === 'f';
    const parentName = isWoman ? motherName : fatherName;

    if (parent) {
      return (
        <a
          onClick={() => navigate(`/people/${parent.slug}${search}`)}
          className={cn({ 'has-text-danger': isWoman })}
        >
          {parentName}
        </a>
      );
    }

    return parentName;
  };

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': personMatch })}
    >
      <td>
        <a
          onClick={() => navigate(`/people/${slug}${search}`)}
          className={cn({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </a>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother?.slug ? renderPersonLink(mother) : motherName || '-'}</td>
      <td>{father?.slug ? renderPersonLink(father) : fatherName || '-'}</td>
    </tr>
  );
};

export default PersonItem;
