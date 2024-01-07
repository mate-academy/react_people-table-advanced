import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../../types';
import { Sex } from '../../../types/sex-enum';

interface Props {
  person: Person,
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const isFemale = person.sex === Sex.FEMALE;

  return (
    <Link
      className={cn({
        'has-text-danger': isFemale,
      })}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  );
};
