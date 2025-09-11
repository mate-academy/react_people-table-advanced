import React from 'react';
import cn from 'classnames';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { usePeople } from '../Context/PeopleContext';

type Props = {
  person: Person;
};

export const PeopleTable: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const { people } = usePeople();
  const location = useLocation();

  const activePerson = people.find(user => user.slug === slug) || null;

  const getParentSlug = (parentName: string | null) => {
    return people.find(p => p.name === parentName)?.slug || null;
  };

  const motherSlug = getParentSlug(person.motherName);
  const fatherSlug = getParentSlug(person.fatherName);

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={cn({
        'has-background-warning': activePerson?.slug === person.slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}${location.search}`}
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {motherSlug ? (
          <Link
            to={`/people/${motherSlug}${location.search}`}
            className={cn({ 'has-text-danger': person.motherName })}
          >
            {person.motherName}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {fatherSlug ? (
          <Link to={`/people/${fatherSlug}${location.search}`}>
            {person.fatherName}
          </Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
