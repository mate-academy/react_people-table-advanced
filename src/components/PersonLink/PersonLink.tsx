import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

type PersonLinkProps = {
  name: string;
  slug?: string;
  isRed: boolean;
};

export function PersonLink({ name, slug, isRed }: PersonLinkProps) {
  const [searchParams] = useSearchParams();

  return (
    <>
      {slug !== undefined ? (
        <Link
          className={cn({ 'has-text-danger': isRed })}
          to={{
            pathname: `/people/${slug}`,
            search: searchParams.toString(),
          }}
        >
          {name}
        </Link>
      ) : (
        name
      )}
    </>
  );
}
