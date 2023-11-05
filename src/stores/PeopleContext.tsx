import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Filters } from '../types/Filter';
import { Context } from '../types/Context';

const initialState: Context = {
  people: [] as Person[],
  isLoading: false,
  loadingError: false,
  filterPeople: () => [],
};

export const PeopleContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filterPeople = ({
    query = '',
    sex = '',
    centuries = [],
    sort = '',
    order = '',
  }: Filters): Person[] => {
    let preparedPeople = [...people];
    const preparedQuery = query.trim().toLowerCase();

    if (preparedQuery) {
      preparedPeople = preparedPeople.filter(person => {
        const { name, fatherName, motherName } = person;

        return name.toLowerCase().includes(preparedQuery)
          ? motherName?.toLowerCase().includes(preparedQuery)
          : fatherName?.toLowerCase().includes(preparedQuery);
      });
    }

    if (sex) {
      preparedPeople = preparedPeople.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      preparedPeople = preparedPeople.filter(person => {
        const { born } = person;
        const personCentury = Math.ceil(born / 100);

        return centuries.includes(personCentury.toString());
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

  const state = {
    people,
    isLoading,
    loadingError,
    filterPeople,
  };

  return (
    <PeopleContext.Provider value={state}>
      {children}
    </PeopleContext.Provider>
  );
};
