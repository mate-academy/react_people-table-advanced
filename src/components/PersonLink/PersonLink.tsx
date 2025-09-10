import { Link, useSearchParams } from 'react-router-dom';

type Props = {
  person: {
    name: string;
    slug: string;
    sex: string;
  };
};

export function PersonLink({ person }: Props) {
  const [searchParams] = useSearchParams();
  const searchQuery = `?${searchParams.toString()}`;

  return (
    <Link
      to={{
        pathname: person.slug,
        search: searchQuery,
      }}
      className={`${person.sex === 'f' ? 'has-text-danger' : ''}`}
    >
      {person.name}
    </Link>
  );
}
