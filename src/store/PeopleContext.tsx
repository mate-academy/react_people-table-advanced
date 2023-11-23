import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleContextType } from './PeopleContextType';

export const PeopleContext = React.createContext<PeopleContextType>({
  people: [],
  loading: false,
  errorMessage: '',
  query: '',
  sort: '',
  order: '',
  sex: '',
  centuries: [],
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('century') || [];

  const preparePeople = (data: Person[]) => {
    const changedPeople = data.map(child => {
      let mother;
      let father;

      if (child.motherName) {
        mother = data.find(({ name }) => child.motherName === name);
      }

      if (child.fatherName) {
        father = data.find(({ name }) => child.fatherName === name);
      }

      return { ...child, father, mother };
    });

    setPeople(changedPeople);
  };

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(preparePeople)
      .catch(() => {
        setErrorMessage('Unable to load people');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const value = useMemo(() => ({
    people,
    loading,
    errorMessage,
    query,
    sort,
    order,
    sex,
    centuries,
  }), [
    loading,
    errorMessage,
    searchParams.toString(),
  ]);

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};

export function usePeople() {
  return useContext(PeopleContext);
}
