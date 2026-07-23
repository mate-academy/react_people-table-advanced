import { Person } from '../types';
import { Link, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  person: Person;
}

export const PersonLink = ({ person }: Props) => {
  const { slug } = useParams();
  const { search } = useLocation();
  const link = slug ? `../${person.slug}` : `./${person.slug}`;

  return (
    <Link
      to={{ pathname: link, search }}
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
