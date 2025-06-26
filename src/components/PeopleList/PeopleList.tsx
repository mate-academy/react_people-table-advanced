import React, { useContext } from 'react';
import { PeopleContext } from '../../context/PeopleContext';
import { PeopleItem } from '../PeopleItem';
import { useFilterPeople } from '../../hooks/useFilterPeople';

export const PeopleList: React.FC = () => {
  const { people } = useContext(PeopleContext);

  const { visiblePeople } = useFilterPeople(people);

  return (
    <tbody>
      {visiblePeople?.map(person => (
        <PeopleItem key={person.slug} person={person} />
      ))}
    </tbody>
  );
};
