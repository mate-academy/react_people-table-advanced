import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  sex: string,
  name: string,
  slug?: string,
};

export const PersonLink: React.FC<Props> = ({ sex, name, slug }) => {
  return (
    <Link
      className={classNames({
        'has-text-danger': sex === 'f',
        'has-text-link': sex === 'm',
      })}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  );
};
