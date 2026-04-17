import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  onSelect?: (slug: string) => void;
};

export const PersonLink = ({ person, onSelect }: Props) => {
  // 1. Отримуємо поточні параметри пошуку з URL
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        // 2. Викликаємо toString() на екземплярі searchParams
        search: searchParams.toString(),
      }}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      onClick={() => {
        if (onSelect) {
          onSelect(person.slug);
        }
      }}
    >
      {person.name}
    </Link>
  );
};
