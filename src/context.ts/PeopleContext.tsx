import {
  ReactNode,
  createContext,
  useCallback,
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

interface PeopleContextInterface {
  people: Person[];
  gender: string;
  error: boolean;
  loading: boolean;
  query: string;
  setQuery(word: string): void;
  centuries: string[];
  handleQuery(word: string): void;
  peopleWithParents: Person[];
  filteredPeople: Person[];
  HandleClickSort(field: string): void;
  order: string;
  sortField: string;
}

export const PeopleContext = createContext<PeopleContextInterface>({
  people: [],
  filteredPeople: [],
  gender: '',
  error: false,
  loading: false,
  query: '',
  setQuery: () => { },
  centuries: [],
  handleQuery: () => { },
  peopleWithParents: [],
  HandleClickSort: () => { },
  order: '',
  sortField: '',
});

export const PeopleContextProvider = ({
  children,
}: { children: ReactNode }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const centuries
    = searchParams.getAll('centuries') || '';
  const gender = searchParams.get('sex') || '';
  const [order, setOrder] = useState('');

  useEffect(() => {
    setLoading(true);
    const loaderData = async () => {
      try {
        const peopleData = await getPeople();

        setLoading(false);

        return setPeople(peopleData);
      } catch {
        return setError(true);
      }
    };

    loaderData();
  }, []);

  const handleQuery = useCallback((word: string) => {
    setQuery(word);
    setSearchParams(getSearchWith(searchParams, { query: word }));
  }, [query, searchParams, people]);

  const peopleWithParents
    = useMemo(() => people.map(person => {
      const mother = people.find((motherPerson) => {
        return motherPerson.name === person.motherName;
      });
      const father = people.find((fatherPerson) => {
        return fatherPerson.name === person.fatherName;
      });

      return {
        ...person,
        mother,
        father,
      };
    }), [people, order, centuries, sortField, searchParams]);

  const filteredPeople = useMemo(() => {
    let newPeople = peopleWithParents;

    if (gender) {
      newPeople = newPeople
        .filter(person => person.sex === gender);
    }

    if (centuries.length) {
      newPeople = newPeople
        .filter(person => centuries
          .find(ages => {
            return (ages === (Math.ceil(person.born / 100)).toString());
          }));
    }

    if (query) {
      newPeople = newPeople
        .filter(person => person.name.toLowerCase()
          .includes(query.toLowerCase().trim()));
    }

    if (sortField && order) {
      newPeople = newPeople.sort((a, b) => {
        switch (sortField) {
          case 'born':
          case 'died':
            return order === 'asc'
              ? a[sortField] - b[sortField]
              : b[sortField] - a[sortField];
          case 'name':
          case 'sex':
            return order === 'desc'
              ? b[sortField].localeCompare(a[sortField])
              : a[sortField].localeCompare(b[sortField]);
          default: throw new Error('wrong sort!!!');
        }
      });
    }

    return newPeople;
  }, [peopleWithParents, people, centuries, sortField, searchParams, order]);

  const HandleClickSort = useCallback((field: string) => {
    if (sortField === field) {
      if (order === '') {
        setOrder('asc');
      } else if (order === 'asc') {
        setOrder('desc');
        setSearchParams(getSearchWith(searchParams, {
          sort: field, order: 'desc',
        }));
      } else {
        setOrder('');
      }
    } else {
      setSortField(field);
      setOrder('asc');
      setSearchParams(getSearchWith(searchParams, { sort: field }));
    }

    window.console.log(sortField);
  }, [sortField, order, searchParams, peopleWithParents, filteredPeople]);

  return (
    <PeopleContext.Provider value={{
      people,
      gender,
      error,
      loading,
      query,
      setQuery,
      centuries,
      handleQuery,
      peopleWithParents,
      filteredPeople,
      HandleClickSort,
      order,
      sortField,

    }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeopleContext = () => useContext(PeopleContext);
