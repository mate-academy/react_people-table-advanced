import { Link } from 'react-router-dom';

interface ParentLinkProps {
  slug?: string | null;
  name: string | null;
  sex?: 'm' | 'f';
  search?: string;
}

export const ParentLink: React.FC<ParentLinkProps> = ({
  slug,
  name,
  sex,
  search,
}) => {
  // No parent → show "-"
  if (!name) {
    return <span>-</span>;
  }

  // Parent exists AND has slug → colored client-side link
  if (slug) {
    const colorClass = sex === 'f' ? 'has-text-danger' : 'has-text-link';

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
  }

  // Parent exists but no slug → plain text
  return <span>{name}</span>;
};
