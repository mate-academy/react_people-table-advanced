import { Link, useLocation } from 'react-router-dom';

type Props = {
  slug: string;
  children: React.ReactNode;
};

export const PersonLink: React.FC<Props> = ({ slug, children }) => {
  const location = useLocation();

  return <Link to={`/people/${slug}${location.search}`}>{children}</Link>;
};
