import React from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Persons } from '../types';
// import { SexFilter } from '../types/FilterType';
import { usePeoplePageContext } from
  '../pages/PeoplePage/PeoplePageContext/PeoplePageContext';

interface Props {
  person: Persons;
}

export const Person: React.FC<Props> = ({ person }) => {
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

  const { people } = usePeoplePageContext();

  const { userSlug } = useParams();

  const selectedPerson = people.find(personToFind => (
    personToFind.slug === userSlug
  ));

  return (
    <tr
      data-cy="person"
      key={slug}
      className={cn({
        'has-background-warning': selectedPerson?.slug === slug,
      })}
    >
      <td>
        <Link
          to={`../${person.slug}`}
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
