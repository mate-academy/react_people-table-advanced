import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { useContext } from 'react';
import { Person } from '../types';
import { PeopleContext } from '../PeopleContext';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();
  const {
    findPersonFather,
    findPersonMother,
    people,
  } = useContext(PeopleContext);

  return (
    <tr
      data-cy="person"
      className={cn('',
        { 'has-background-warning': personSlug === person.slug })}
    >
      <td>
        <a
          href={`#/people/${person.slug}`}
          className={cn('', { 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </a>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {findPersonMother(people, person)
        ? (
          <td>
            <a
              href={`#/people/${findPersonMother(people, person)}`}
              className="has-text-danger"
            >
              {person.motherName}
            </a>
          </td>
        )
        : <td>{person.motherName ? person.motherName : '-'}</td>}
      {findPersonFather(people, person)
        ? (
          <td>
            <a href={`#/people/${findPersonFather(people, person)}`}>
              {person.fatherName}
            </a>
          </td>
        )
        : <td>{person.fatherName ? person.fatherName : '-'}</td>}
    </tr>
  );
};
