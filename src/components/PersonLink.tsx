import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  name: string;
  people: Person[];
  setSelectedPerson: (person: Person) => void;
};

export const PersonLink: React.FC<Props> = ({
  name,
  people,
  setSelectedPerson,
}) => {
  const person = people.find(p => p.name === name);

  if (person) {
    const { sex, slug } = person;

    return (
      <Link
        to={`../${slug}`}
        className={classNames({ 'has-text-danger': sex === 'f' })}
        onClick={() => setSelectedPerson(person)}
      >
        {name}
      </Link>
    );
  }

  return <span>{name}</span>;
};
