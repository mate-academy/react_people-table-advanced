import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { PeopleContext } from '../../PeopleContext';
import { PeopleItem } from '../PeopleItem/PeopleItem';
import { Person } from '../../types';
import { Gender, TableFilters } from '../../enum';

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
    if (sort === TableFilters.Name || sort === TableFilters.Sex) {
      persons.sort((a, b) => b[sort].localeCompare(a[sort]));
    }

    if (sort === TableFilters.Born || sort === TableFilters.Died) {
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
      case Gender.F:
        return query?.trim()
          ? filteredArray.filter((person) => filterCondition(person, Gender.F))
          : filteredArray.filter((person) => person.sex === Gender.F);
      case Gender.M:
        return query?.trim()
          ? filteredArray.filter((person) => filterCondition(person, Gender.M))
          : filteredArray.filter((person) => person.sex === Gender.M);
      default:
        return query?.trim()
          ? filteredArray.filter((person) => {
            return filterCondition(person, Gender.F)
              || filterCondition(person, Gender.M);
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
