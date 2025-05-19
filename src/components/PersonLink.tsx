import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
  className?: string;
}

export const PersonLink: React.FC<Props> = ({ person, className }) => {
  const location = useLocation();

  const slug = `${person.name.toLowerCase().trim().replace(/\s+/g, '-')}-${person.born}`;
  const query = location.search; // зберігає всі поточні ?параметри

  return (
    <NavLink to={`/people/${slug}${query}`} className={className}>
      {person.name}
    </NavLink>
  );
};
