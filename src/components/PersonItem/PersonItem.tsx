import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types/Person';

type Props = {
  people: Person[];
  person: Person;
};

export const PersonItem: React.FC<Props> = ({ people, person }) => {
  const { slug = '' } = useParams();

  const handleSearchPerson = (peopleList: Person[], wantedPerson: string) => {
    return peopleList.find(
      personFromList => personFromList.name === wantedPerson,
    ) || null;
  };

  const handleSearchParent = (parent: string | null) => {
    return parent
      ? (
        <PersonLink
          person={handleSearchPerson(people, parent)}
          personParent={parent}
        />
      )
      : null;
  };

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': person.slug === slug },
      )}
    >
      <td>
        <PersonLink
          person={person}
        />
      </td>

      <td>{person.sex}</td>

      <td>{person.born}</td>

      <td>{person.died}</td>

      <td>
        {person.motherName
          ? handleSearchParent(person.motherName)
          : '-'}
      </td>

      <td>
        {person.fatherName
          ? handleSearchParent(person.fatherName)
          : '-'}
      </td>
    </tr>
  );
};
