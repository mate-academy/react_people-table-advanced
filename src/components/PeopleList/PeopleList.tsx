import React, { useContext } from 'react';
import { PeopleContext } from '../../PeopleContext';
import { PeopleItem } from '../PeopleItem/PeopleItem';
import { useLocation} from 'react-router-dom';

export const PeopleList: React.FC = () => {
  const { persons } = useContext(PeopleContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');

  const filterByGender = () => {
    if (sex === 'm') {
      return persons.filter((person) => person.sex === 'm');
    }

    if (sex === 'f') {
      return persons.filter((person) => person.sex === 'f');
    }

    return persons;
  };

  const filteredPeople = () => {
    if (query?.trim()) {
      return persons.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase());
      });
    }

    if (sex !== 'all') {
      return filterByGender();
    }

    // if (sex && sex !== 'all' && query && query.trim()) {
    //   return filterByGender().filter((person) => {
    //     return person.name.toLowerCase().includes(query.toLowerCase());
    //   });
    // }

    return persons;
  };

  return (
    <tbody>
      {filteredPeople().map((person) => (
        <PeopleItem person={person} key={person.slug} />
      ))}
    </tbody>
  );
};
