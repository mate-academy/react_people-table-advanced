import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface Props {
  name: string | undefined;
  slug: string;
  sex: string;
}

export const PersonLink: React.FC<Props> = ({ name, slug, sex }) => {
  return (
    <Link
      key={slug}
      to={`/people/${slug}`}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name?.trim() || '-'}
    </Link>
  );
};
