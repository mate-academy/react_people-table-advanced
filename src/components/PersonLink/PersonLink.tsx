import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export const PersonLink = ({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) => (
  <Link to={`/people/${to}`} className={className}>
    {children}
  </Link>
);
