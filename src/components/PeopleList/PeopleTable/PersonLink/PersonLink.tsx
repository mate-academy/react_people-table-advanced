import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  to: {
    pathname: string,
    search: string,
  };
  text: string;
  className: string,
};

export const PersonLink: FC<Props> = ({ to, text, className }) => {
  return (
    <Link
      to={to.pathname + to.search}
      className={className}
    >
      {text}
    </Link>
  );
};
