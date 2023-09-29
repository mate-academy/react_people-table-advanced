import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Person } from '../types';
import { FEMALE_SEX } from '../utils/constants';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={classnames({
        'has-text-danger': person.sex === FEMALE_SEX,
      })}
    >
      {person.name}
    </Link>
  );
};
