import React, { useEffect } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeopleContext = React.createContext({
  people: [] as Person[],
  peopleLoading: false,
  peopleError: false,
  empty: false,
  sort: 'null',
  order: 'null',
  centuries: [] as string[],
  sex: null as string | null,
  query: '',
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = React.useState<Person[]>([]);
  const [peopleLoading, setPeopleLoading] = React.useState(false);
  const [peopleError, setPeopleError] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);
  const [searchParams] = useSearchParams();
  const order = searchParams.get('order') || 'null';
  const sort = searchParams.get('sort') || 'null';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setPeopleLoading(true);
        const loaded = await getPeople();

        setPeople(loaded);
        setEmpty(loaded.length === 0);
      } catch {
        setPeopleError(true);
      } finally {
        setPeopleLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <PeopleContext.Provider
      value={{
        people,
        peopleLoading,
        peopleError,
        empty,
        sort,
        order,
        centuries,
        sex,
        query,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
