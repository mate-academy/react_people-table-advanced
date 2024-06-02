import React, { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeopleContext = React.createContext({
  allPeople: [] as Person[],
  isLoading: false,
  errorMessage: '',
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsloading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Unable to load people list'))
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  function getPersonMother(motherName: string | null) {
    return people.find(person => person.name === motherName);
  }

  function getPersonFather(fatherName: string | null) {
    return people.find(person => person.name === fatherName);
  }

  const allPeople = people.map(person => ({
    ...person,
    mother: getPersonMother(person.motherName),
    father: getPersonFather(person.fatherName),
  }));

  const value = useMemo(
    () => ({ allPeople, isLoading, errorMessage }),
    [allPeople, isLoading, errorMessage],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
