import { Link, useLocation } from 'react-router-dom';

type Props = {
  personSlug: string;
  children: React.ReactNode;
  className?: string;
};

export const PersonLink: React.FC<Props> = ({
  personSlug,
  children,
  className,
}) => {
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${personSlug}`,
        search,
      }}
      className={className}
    >
      {children}
    </Link>
  );
};
