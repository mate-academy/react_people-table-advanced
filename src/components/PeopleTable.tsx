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

  const getParent = (parentName: string | null) =>
    people.find(p => p.name === parentName) || null;

  const parents = [
    { person: getParent(person.motherName), defaultName: person.motherName },
    { person: getParent(person.fatherName), defaultName: person.fatherName },
  ];

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': activePerson?.slug === person.slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}${location.search}`}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {parents.map((p, idx) => (
        <td key={idx}>
          {p.person ? (
            <Link
              to={`/people/${p.person.slug}${location.search}`}
              className={cn({ 'has-text-danger': p.person.sex === 'f' })}
            >
              {p.person.name}
            </Link>
          ) : (
            p.defaultName || '-'
          )}
        </td>
      ))}
    </tr>
  );
};
