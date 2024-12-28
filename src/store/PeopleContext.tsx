import React, { useEffect, useMemo, useState } from 'react';

import * as person from '../api';

import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { getPreparedPeople } from '../utils/peopleHelper';

export const PeopleContext = React.createContext({
  people: [] as Person[],
  preparedPeople: [] as Person[],
  isError: false,
  isLoading: false,
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    person
      .getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const preparedPeople = getPreparedPeople(people, {
    sex,
    query,
    centuries,
    sort,
    order,
  });

  const value = useMemo(
    () => ({
      preparedPeople,
      isLoading,
      isError,
      people,
    }),
    [preparedPeople, isLoading, isError, people],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
