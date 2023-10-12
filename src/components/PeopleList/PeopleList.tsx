import { useContext } from 'react';
import { PersonItem } from '../PersonItem';
import { PeopleProvider } from '../../store/PeopleContext';

export const PeopleList = () => {
  const { preparedPeople } = useContext(PeopleProvider);

  return (
    <>
      {preparedPeople.map(person => (
        <PersonItem
          people={preparedPeople}
          key={person.slug}
          person={person}
        />
      ))}
    </>
  );
};
