import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  name: string | null;
  slug: string | null;
  sex: string;
}

export const PersonLink: React.FC<Props> = ({ name, slug, sex }) => {
  const [searchParams] = useSearchParams();

  if (!name) {
    return <span>-</span>;
  }

  const className = cn({
    'has-text-info': sex === 'm',
    'has-text-danger': sex === 'f',
  });

  if (slug) {
    return (
      <Link
        to={{ pathname: `${slug}`, search: searchParams.toString() }}
        className={className}
      >
        {name}
      </Link>
    );
  }

  return <span className={className}>{name}</span>;
};
