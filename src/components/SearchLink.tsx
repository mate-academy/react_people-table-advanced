import { Link, useLocation } from 'react-router-dom';

type Props = {
  to: string;
  children: React.ReactNode;
};

export const SearchLink = ({ to, children }: Props) => {
  const location = useLocation();

  return <Link to={`${to}${location.search}`}>{children}</Link>;
};
