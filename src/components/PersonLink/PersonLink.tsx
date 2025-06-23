import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types/Person';

type Props = {
  person: Person | null;
  personName: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, personName }) => {
  if (!person) {
    return <>{personName || '-'}</>;
  }

  return (
    <Link
      to={`../${person.slug}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
