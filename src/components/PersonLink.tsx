import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
};

const FEMALE = 'f';

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;

  if (!person) {
    return <span>-</span>;
  }

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({
        'has-text-danger': sex === FEMALE,
      })}
    >
      {name}
    </Link>
  );
};
