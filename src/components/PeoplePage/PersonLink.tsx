import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';
import { useNavigation } from '../NavigationContext/NavigationContext';
type Props = {
  person: Person;

  onHover: () => void;
};

export const PersonLink: React.FC<Props> = ({ person, onHover }) => {
  const { setIsHoveredPage, setSelected } = useNavigation();

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      onClick={() => {
        setSelected(person.name);
        onHover(false);
        setIsHoveredPage(true);
      }}
    >
      {person.name}
    </Link>
  );
};
