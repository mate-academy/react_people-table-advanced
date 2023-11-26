import React, { useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const PeopleContext = React.createContext({
  peoplE: [] as Person[],
  loading: false,
  messageNotHasPeople: '',
  errorMessage: '',
  loadPeople: async () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [peoplE, setPeoplE] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [messageNotHasPeople, setMessageNotHasPeople] = useState('');

  const loadPeople = () => {
    setErrorMessage('');

    setLoading(true);

    return getPeople()
      .then((people: Person[]) => {
        setPeoplE(people);

        if (!people.length) {
          setMessageNotHasPeople('There are no people on the server');
        }
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  };

  const value = {
    peoplE,
    loading,
    messageNotHasPeople,
    errorMessage,
    loadPeople,
  };

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};
