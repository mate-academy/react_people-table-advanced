import React, { useContext, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { PeopleContext } from '../../PeopleContext';
import { Sex } from '../../enum';

interface Props {
  person: Person
}

export const PeopleItem: React.FC<Props> = ({ person }) => {
  const {
    motherName, sex, fatherName, slug, born, died,
  } = person;

  const { personSlug } = useParams();
  const { persons } = useContext(PeopleContext);

  const findPersonByName = useMemo(() => {
    return (name: string): Person | undefined => {
      return persons.find((p) => p.name === name);
    };
  }, [persons]);

  const mother = useMemo(() => {
    return findPersonByName(motherName ?? '');
  }, [findPersonByName, motherName]);

  const father = useMemo(() => {
    return findPersonByName(fatherName ?? '');
  }, [findPersonByName, fatherName]);

  const renderParentLink = (parent: Person | undefined, parentName: string) => {
    return parent ? <PersonLink person={parent} /> : parentName;
  };

  return (
    <tr
      key={slug}
      data-cy="person"
      className={cn({
        'has-background-warning': slug === personSlug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={cn({ 'has-text-danger': sex === Sex.F })}
        >
          {person.name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>{motherName ? renderParentLink(mother, motherName) : '-'}</td>
      <td>{fatherName ? renderParentLink(father, fatherName) : '-'}</td>
    </tr>
  );
};
