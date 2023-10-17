import React, { useContext, useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Filters } from '../types/Filters';
import { Context } from './Context';
import { getCentury } from '../utils/getCentury';

export const PeopleContext = React.createContext<Context>({
  people: [],
  loading: false,
  loadingError: false,
  filterPeople: () => [],
});

type Props = {
  children: React.ReactNode;
};

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setLoadingError(true))
      .finally(() => setLoading(false));
  }, []);

  const filterPeople = (
    {
      query = '',
      sex = '',
      centuries = [],
      sort = '',
      order = '',
    }: Filters,
  ): Person[] => {
    let preparedPeople = [...people];

    const preparedQuery = query.trim().toLowerCase();

    if (preparedQuery) {
      preparedPeople = preparedPeople.filter(person => {
        const { name, motherName, fatherName } = person;

        return name.toLowerCase().includes(preparedQuery)
          || motherName?.toLowerCase().includes(preparedQuery)
          || fatherName?.toLowerCase().includes(preparedQuery);
      });
    }

    if (sex) {
      preparedPeople = preparedPeople.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      preparedPeople = preparedPeople.filter(person => {
        const { born } = person;
        const personCentury = getCentury(born);

        return centuries.includes(personCentury);
      });
    }

    if (sort) {
      preparedPeople.sort((person1, person2) => {
        switch (sort) {
          case 'name':
          case 'sex':
            return person1[sort].localeCompare(person2[sort]);

          case 'born':
          case 'died':
            return person1[sort] - person2[sort];

          default:
            return 0;
        }
      });
    }

    if (order === 'desc') {
      preparedPeople.reverse();
    }

    return preparedPeople;
  };

  const value = {
    people,
    loading,
    loadingError,
    filterPeople,
  };

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};

export function usePeople() {
  const people = useContext(PeopleContext);

  return people;
}
