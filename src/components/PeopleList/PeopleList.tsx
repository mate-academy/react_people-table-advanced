import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { PeopleContext } from '../../PeopleContext';
import { PeopleItem } from '../PeopleItem/PeopleItem';
import { Person } from '../../types';

export const PeopleList: React.FC = () => {
  const { persons } = useContext(PeopleContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries').map(Number);
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filterCondition = (person: Person, filterSex: string) => {
    return person.sex === filterSex && person.name.toLowerCase()
      .includes(query?.toLowerCase() || '');
  };

  const centFilter = () => {
    if (centuries.length > 0) {
      return persons.filter((person) => {
        return centuries.includes(Math.ceil(person.born / 100));
      });
    }

    return persons;
  };

  const tableSort = () => {
    if (sort === 'name' || sort === 'sex') {
      persons.sort((a, b) => b[sort].localeCompare(a[sort]));
    }

    if (sort === 'born' || sort === 'died') {
      persons.sort((a, b) => b[sort] - a[sort]);
    }

    if (order === 'desc') {
      persons.reverse();
    }
  };

  const filteredPeople = () => {
    const filteredArray = centFilter().slice();

    tableSort();

    switch (sex) {
      case 'f':
        return query?.trim()
          ? filteredArray.filter((person) => filterCondition(person, 'f'))
          : filteredArray.filter((person) => person.sex === 'f');
      case 'm':
        return query?.trim()
          ? filteredArray.filter((person) => filterCondition(person, 'm'))
          : filteredArray.filter((person) => person.sex === 'm');
      default:
        return query?.trim()
          ? filteredArray.filter((person) => {
            return filterCondition(person, 'f') || filterCondition(person, 'm');
          })
          : filteredArray;
    }
  };

  return (
    <tbody>
      {filteredPeople().map((person) => (
        <PeopleItem person={person} key={person.slug} />
      ))}
    </tbody>
  );
};
