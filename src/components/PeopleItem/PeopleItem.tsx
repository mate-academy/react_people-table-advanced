import React, { useCallback, useContext, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { PeopleContext } from '../../PeopleContext';
import { Gender } from '../../enum';

interface Props {
  person: Person
}

export const PeopleItem: React.FC<Props> = ({ person }) => {
  const {
    motherName, sex, fatherName, slug, born, died,
  } = person;

  const [searchParams] = useSearchParams();
  const userName = searchParams.get('slug') || '';

  const { persons } = useContext(PeopleContext);

  const findPersonByName = useCallback(
    (name: string): Person | undefined => {
      return persons.find((p) => p.name === name);
    },
    [persons],
  );

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
        'has-background-warning': slug === userName,
      })}
    >
      <td>
        <Link
          to={`../people/${slug}`}
          className={cn({ 'has-text-danger': sex === Gender.F })}
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
