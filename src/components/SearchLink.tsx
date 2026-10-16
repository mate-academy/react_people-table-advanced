/* eslint-disable @typescript-eslint/indent */
import { Link, LinkProps, useLocation } from 'react-router-dom';

export const SearchLink = (props: LinkProps) => {
  const { search } = useLocation();

  const to =
    typeof props.to === 'string'
      ? {
          pathname: props.to,
          search,
        }
      : {
          ...props.to,
          search,
        };

  return <Link {...props} to={to} />;
};
