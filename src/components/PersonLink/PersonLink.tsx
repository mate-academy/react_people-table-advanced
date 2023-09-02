import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const Personlink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <Link
      to={slug ? `../${person.slug}` : person.slug}
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
