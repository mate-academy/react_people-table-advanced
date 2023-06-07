import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from './types';

interface Props {
  person: Person;
}

export const PersonalLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
