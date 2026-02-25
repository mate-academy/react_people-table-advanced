import { Link } from 'react-router-dom';

type PersonLinkProps = {
  slug: string;
  name: string;
  sex: 'm' | 'f';
  search: string;
  className?: string;
};

export const PersonLink: React.FC<PersonLinkProps> = ({
  slug,
  name,
  sex,
  search,
  className,
}) => {
  const colorClass =
    className ?? (sex === 'f' ? 'has-text-danger' : 'has-text-link');

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: search || '',
      }}
      className={colorClass}
    >
      {name}
    </Link>
  );
};
