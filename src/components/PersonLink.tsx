import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { FEMALE } from '../utils/variables';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`../${person.slug}`}
      className={classNames(
        { 'has-text-danger': person.sex === FEMALE },
      )}
    >
      {person.name}
    </Link>
  );
};
