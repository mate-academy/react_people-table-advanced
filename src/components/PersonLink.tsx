import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface PersonLinkProps {
  name: string | undefined;
  slug: string;
  sex: string;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ name, slug, sex }) => {
  return (
    <Link
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
      to={`/people/${slug}`}
    >
      {name?.trim() || '-'}
    </Link>
  );
};
