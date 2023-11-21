import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLinkProps } from '../types/PersonLinkProps';

export const PersonLink: React.FC<PersonLinkProps> = ({ person, onSelect }) => {
  const handleClick = () => {
    onSelect(person.slug);
  };

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      onClick={handleClick}
    >
      {person.name}
    </Link>
  );
};
