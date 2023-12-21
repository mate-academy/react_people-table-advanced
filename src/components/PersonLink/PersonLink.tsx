import {
  Link, useLocation,
} from 'react-router-dom';
import classNames from 'classnames';
import { convertToSlug } from '../function/convertToSlug';
import { isFemale } from '../function/isFemale';
import { Person } from '../../types';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const { search } = useLocation();
  const personSlug = convertToSlug(person.name, person.born);

  return (
    <Link
      to={{
        pathname: `../:${personSlug}`,
        search,
      }}
      className={classNames({
        'has-text-danger': isFemale(person.sex),
      })}
    >
      {person.name}
    </Link>
  );
};
