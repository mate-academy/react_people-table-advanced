import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  name: string;
  slug: string;
  sex: string;
};

export const PersonLink: React.FC<Props> = ({ name, slug, sex }) => {
  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
