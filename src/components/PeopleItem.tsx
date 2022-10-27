import { FC } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person;
}

export const PeopleItem: FC<Props> = ({ person }) => {
  const { slug: slugParam } = useParams();
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    father,
    mother,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === slugParam })}
    >
      <td>
        <PersonLink person={person} personName={name} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td><PersonLink person={mother} personName={motherName} /></td>
      <td><PersonLink person={father} personName={fatherName} /></td>
    </tr>
  );
};
