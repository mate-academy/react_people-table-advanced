import classNames from 'classnames';
import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface Props {
  name: string;
  slug: string;
  sex: string;
}

export const PersonLink: FC<Props> = ({ name, slug, sex }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const updatedUrl = `${slug}?${queryParams.toString()}`;

  return (
    <NavLink
      to={updatedUrl}
      className={
        classNames(
          {
            'has-text-danger': sex === 'f',
          },
        )
      }
    >
      {name}
    </NavLink>
  );
};
