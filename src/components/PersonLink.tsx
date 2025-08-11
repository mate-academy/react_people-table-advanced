import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  isWoman: boolean;
  slug: string;
  name: string;
};

export const PersonLink: React.FC<Props> = ({ slug, isWoman, name }) => {
  const { search } = useLocation();

  if (slug) {
    return (
      <Link
        to={{ pathname: `/people/${slug}`, search }}
        className={classNames({ 'has-text-danger': isWoman })}
      >
        {name}
      </Link>
    );
  } else {
    return `${name}`;
  }
};
