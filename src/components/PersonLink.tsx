import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

type Props = {
  name: string | null;
  slug: string;
  sex: string;
};

export const PersonLink: React.FC<Props> = ({ name, slug, sex }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: searchParams.toString(),
      }}
      className={cn({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
