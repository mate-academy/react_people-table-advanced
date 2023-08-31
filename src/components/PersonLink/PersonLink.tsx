import { useMemo } from 'react';
// import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
  people: Person[];
  handleSlugUser: (value: string) => void;
  isParent: 'no' | 'mother' | 'father';
  searchParams: string;
};

export const PersonLink = ({
  person,
  handleSlugUser,
  people,
  isParent,
  searchParams,
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
    // <a
    //   className={findPerson.sex === 'f'
    //     ? 'has-text-danger'
    //     : ''}
    //   href={`#/people/${findPerson.slug}${searchParams}`}
    //   onClick={() => {
    //     return handleSlugUser(findPerson.slug);
    //   }}
    // >
    //   {findPerson.name}
    // </a>
    <Link
      className={findPerson.sex === 'f'
        ? 'has-text-danger'
        : ''}
      to={`#/people/${findPerson.slug}${searchParams}`}
      onClick={() => {
        return handleSlugUser(findPerson.slug);
      }}
    >
      {findPerson.name}
    </Link>
  );
};
