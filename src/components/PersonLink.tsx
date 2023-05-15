import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { FC } from 'react';

export type Props = {
  to: string;
  text: string;
  sex?: string;
};

export const PersonLink: FC<Props> = ({ to, text, sex }) => (
  <NavLink
    to={`../${to}`}
    className={sex === 'f' ? classNames('has-text-danger') : ''}
  >
    {text}
  </NavLink>
);
