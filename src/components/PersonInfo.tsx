import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

type Props = {
  person: Person;
  findParent: (parentName: string) => string | JSX.Element;
};

export const PersonInfo: React.FC<Props> = ({ person, findParent }) => {
  const { slug } = useParams();
  const {
    sex, born, died, motherName, fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {
          motherName
            ? findParent(motherName)
            : '-'
        }
      </td>
      <td>
        {
          fatherName
            ? findParent(fatherName)
            : '-'
        }
      </td>
    </tr>
  );
};
