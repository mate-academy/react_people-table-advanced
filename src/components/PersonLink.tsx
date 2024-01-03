import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { PersonSex } from '../types/enum';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, slug, sex } = person;

  return (
    <Link
      className={cn({ 'has-text-danger': sex === PersonSex.FEMALE })}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  );
};
