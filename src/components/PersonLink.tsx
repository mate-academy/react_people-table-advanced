import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person, SexType } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;

  return (
    <Link
      className={cn({ 'has-text-danger': sex === SexType.female })}
      to={`../${slug}`}
    >
      {name}
    </Link>
  );
};
