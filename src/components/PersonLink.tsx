import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  person: Pick<Person, 'name' | 'slug'>;
  people: Person[],
  onPersonClick: (slug: string) => void;
}

export const PersonLink: React.FC<Props> = ({
  person,
  people,
  onPersonClick,
}) => {
  const { name, slug } = person;

  const personExists = people.find(user => user.name === person.name);

  const isWoman = people.find(
    user => user.name === person.name && user.sex === 'f',
  );
  const linkUrl = `/people/${slug}`;

  const handlePersonClick = () => {
    onPersonClick(slug);
  };

  return (
    (personExists)
      ? (
        <Link
          to={linkUrl}
          onClick={handlePersonClick}
          className={isWoman ? 'has-text-danger' : ''}
        >
          {name}
        </Link>
      )
      : (
        <span>{person.name}</span>
      )
  );
};
