import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  text: string;
  sex?: string;
}

export const PersonLink: React.FC<Props> = ({ to, text, sex }) => (
  <NavLink
    to={`../${to}`}
    className={cn({ 'has-text-danger': sex === 'f' })}
  >
    {text}
  </NavLink>
);
