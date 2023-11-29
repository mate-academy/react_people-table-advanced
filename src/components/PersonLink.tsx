import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { Gender } from '../types/Gender';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({ 'has-text-danger': person.sex === Gender.FEMALE })}
    >
      {person.name}
    </Link>
  );
};
