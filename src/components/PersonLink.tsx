import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface PersonLinkProps {
  name: string | undefined;
  slug: string;
  sex: string;
}

enum Sex {
  female = 'f',
}

export const PersonLink: React.FC<PersonLinkProps> = ({ name, slug, sex }) => {
  return (
    <Link
      className={classNames({
        'has-text-danger': sex === Sex.female,
      })}
      to={`/people/${slug}`}
    >
      {name?.trim() || '-'}
    </Link>
  );
};
