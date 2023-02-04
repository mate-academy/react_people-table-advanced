import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  slug: string;
  name: string;
  sex: string;
};

export const PersonLink: React.FC<Props> = ({
  slug,
  name,
  sex,
}) => {
  return (
    <Link
      to={`/people/${slug}`}
      className={classNames(
        {
          'has-text-danger': sex === 'f',
        },
      )}
    >
      {name}
    </Link>
  );
};
