import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

interface Props {
  slug: string;
  name: string;
  isDangerous: boolean;
}

export const PersonLink = ({ slug, name, isDangerous }: Props) => {
  const [searchParams] = useSearchParams();

  if (slug) {
    return (
      <Link
        className={cn({ 'has-text-danger': isDangerous })}
        to={{
          pathname: `/people/${slug}`,
          search: searchParams.toString(),
        }}
      >
        {name}
      </Link>
    );
  } else {
    return <span>{name}</span>;
  }
};
