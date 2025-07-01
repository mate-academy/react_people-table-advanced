import { NavLink } from 'react-router-dom';
import { Person } from '../types';

interface SearchLinkProps {
  person?: Person;
  name?: string;
  people?: Person[];
  onClick?: (slug: string) => void;
}

export const SearchLink = ({
  person,
  name,
  people,
  onClick,
}: SearchLinkProps) => {
  let targetPerson = person;

  if (!targetPerson && name && people) {
    targetPerson = people.find(p => p.name === name);
  }

  if (!targetPerson) {
    return <>{name ?? '-'}</>;
  }

  const className = targetPerson.sex === 'f' ? 'has-text-danger' : undefined;

  const handleClick = () => {
    if (onClick) {
      onClick(targetPerson.slug);
    }
  };

  return (
    <NavLink
      to={`/people/${targetPerson.slug}`}
      className={className}
      onClick={handleClick}
    >
      {targetPerson.name}
    </NavLink>
  );
};
