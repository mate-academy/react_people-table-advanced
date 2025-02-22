import { Link } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';

type Props = {
  person: Person | undefined;
};
export const LinkPerson = ({ person }: Props) => {
  return (
    <Link
      className={cn({
        'has-text-danger': person?.sex === 'f',
      })}
      to={`/people/${person?.slug}`}
    >
      {person?.name}
    </Link>
  );
};
