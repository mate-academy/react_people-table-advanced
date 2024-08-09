import { Link } from 'react-router-dom';
import { Person } from '../types/Person';
import cn from 'classnames';

type Props = {
  person: Person;
};

enum Gender {
  Female = 'f',
  Male = 'm',
}

export const PersonLink = ({ person }: Props) => {
  const { name, slug, sex } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({ 'has-text-danger': sex === Gender.Female })}
    >
      {name}
    </Link>
  );
};
