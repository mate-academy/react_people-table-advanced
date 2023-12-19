import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { convertToSlug } from '../function/convertToSlug';
import { isFemale } from '../function/isFemale';
import { Person } from '../../types';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const personSlug = convertToSlug(person.name, person.born);

  return (
    <Link
      to={`../:${personSlug}`}
      className={classNames({
        'has-text-danger': isFemale(person.sex),
      })}
    >
      {person.name}
    </Link>
  );
};
