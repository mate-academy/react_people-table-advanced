import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { PersonSex } from '../../types/personSex';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === PersonSex.FEMALE,
      })}
    >
      {person.name}
    </Link>
  );
};
