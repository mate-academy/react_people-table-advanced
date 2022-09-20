import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Person } from '../../types';

type TProps = {
  person: Person;
};

export const PersonLink: React.FC<TProps> = ({ person }) => (
  <Link
    to={`../${person.slug}`}
    className={classNames({
      'has-text-danger': person.sex === 'f',
    })}
  >
    {person.name}
  </Link>
);
