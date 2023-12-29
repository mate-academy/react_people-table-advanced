import React from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person as PersonType } from '../../types';
import { usePeoplePageContext }
  from '../../pages/PeoplePage/PeoplePageContext/PeoplePageContext';

type Props = {
  person: PersonType
};

export const Person: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  const { people } = usePeoplePageContext();

  const mother = people
    .find(mom => mom.name === person.motherName) || null;
  const father = people
    .find(dad => dad.name === person.fatherName) || null;

  const { userSlug } = useParams();
  const selectedPerson = people.find(personToFind => (
    personToFind.slug === userSlug
  ));

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': selectedPerson?.slug === slug,
      })}
    >
      <td>
        <Link
          to={`../${slug}`}
          className={cn({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link
            to={`../${mother.slug}`}
            className="has-text-danger"
          >
            {mother.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link
            to={`../${father.slug}`}
          >
            {father.name}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
