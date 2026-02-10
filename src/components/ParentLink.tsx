import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  parent: Person;
};

export const ParentLink: React.FC<Props> = ({ parent }) => {
  const { name, slug, sex } = parent;

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
