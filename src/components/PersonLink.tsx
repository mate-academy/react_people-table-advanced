import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  currentPerson: Person;
};

export const PersonLink: React.FC<Props> = ({ currentPerson }) => {
  const { name, sex, slug } = currentPerson;

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({ 'has-text-danger ': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
