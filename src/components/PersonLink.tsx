import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  name: string;
  slug: string;
  sex: string;
}

export const PersonLink: FC<Props> = ({ name, slug, sex }) => {
  return (
    <NavLink
      to={slug}
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

export default PersonLink;
