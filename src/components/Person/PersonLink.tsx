import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { PersonSex } from '../../types/PersonSex';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({ 'has-text-danger': sex === PersonSex.female })}
    >
      {name}
    </Link>
  );
};
