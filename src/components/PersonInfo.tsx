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

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {
          person.motherName
            ? findParent(person.motherName)
            : '-'
        }
      </td>
      <td>
        {
          person.fatherName
            ? findParent(person.fatherName)
            : '-'
        }
      </td>
    </tr>
  );
};
