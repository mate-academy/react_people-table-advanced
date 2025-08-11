import { Person } from '../types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  person: Person | undefined;
};

export const PersonLink: React.FC<Props> = props => {
  const { person } = props;

  return (
    <Link
      to={`/people/${person?.slug}`}
      className={cn({ 'has-text-danger': person?.sex === 'f' })}
    >
      {person?.name}
    </Link>
  );
};
