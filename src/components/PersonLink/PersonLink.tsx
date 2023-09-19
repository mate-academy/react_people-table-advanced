import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
  people: Person[];
  handleSlugUser: (value: string) => void;
  isParent: 'no' | 'mother' | 'father';
  allParams: string;
};

export const PersonLink = ({
  person,
  handleSlugUser,
  people,
  isParent,
  allParams,
}:Props) => {
  const findPerson = useMemo(() => {
    if (isParent === 'no') {
      return person;
    }

    let parent = people.find(one => one.name === person.motherName);

    if (isParent === 'father') {
      parent = people.find(one => one.name === person.fatherName);
    }

    if (!parent) {
      return person;
    }

    return parent;
  }, []);

  return (
    <Link
      className={findPerson.sex === 'f'
        ? 'has-text-danger'
        : ''}
      to={`/people/${findPerson.slug}${allParams}`}
      onClick={() => handleSlugUser(findPerson.slug)}
    >
      {findPerson.name}
    </Link>
  );
};
