import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person,
  slug: string
};

export const PersonLink: React.FC<Props> = ({ person, slug }) => {
  return (
    <Link
      to={`../${slug}`}
      className={classNames(
        { 'has-text-danger': person.sex === 'f' },
      )}
    >
      {person.name}
    </Link>
  );
};
