import React, { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { ErrorType } from '../types/ErrorType';
import { useSearchParams } from 'react-router-dom';
import { SortField } from '../types/SortField';
import { SortOrder } from '../types/SortOrder';

interface PeopleContextType {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isError: ErrorType | null;
  setError: React.Dispatch<React.SetStateAction<ErrorType | null>>;
}

type Props = {
  children: React.ReactNode;
};

const defaultContext: PeopleContextType = {
  people: [],
  setPeople: () => {},
  isError: null,
  setError: () => {},
  isLoading: false,
  setLoading: () => {},
};

export const PeopleContext = React.createContext(defaultContext);

export const PeopleProvider = ({ children }: Props) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState<ErrorType | null>(null);
  const [searchParams] = useSearchParams();

  const fetchPeople = async () => {
    setLoading(true);

    try {
      const peopleFromServer = await getPeople();

      const preparedPeople = peopleFromServer.map((person, _, arr) => {
        return {
          ...person,
          father: arr.find(
            personToFind => personToFind.name === person.fatherName,
          ),
          mother: arr.find(
            personToFind => personToFind.name === person.motherName,
          ),
        };
      });

      if (preparedPeople.length === 0) {
        setError(ErrorType.NO_PEOPLE_ERROR);

        return;
      }

      setPeople(preparedPeople);
    } catch {
      setError(ErrorType.LOADING_ERRROR);
    } finally {
      setLoading(false);
    }
  };

  const filterPeople = (peopleTofilter: Person[]) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    let filteredPeople = [...peopleTofilter];
    const sexFilter: string = searchParams.get('sex') as string;
    const query = searchParams.get('query')?.toLowerCase() || '';
    const centuriesInParams: number[] = searchParams
      .getAll('centuries')
      .map(Number);

    if (sexFilter === 'm' || sexFilter === 'f') {
      filteredPeople = filteredPeople.filter(
        person => person.sex === sexFilter,
      );
    }

    if (query) {
      filteredPeople = filteredPeople.filter(person => {
        return (
          person.name.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query)
        );
      });
    }

    if (centuriesInParams.length > 0) {
      filteredPeople = filteredPeople.filter(person => {
        const personCentury = Math.floor(person.died / 100) + 1;

        return centuriesInParams.includes(personCentury);
      });
    }

    if (filteredPeople.length === 0) {
      setError(ErrorType.NO_MATCHES);
    } else {
      setError(null);
    }

    return filteredPeople;
  };

  const sortPeople = (peopleToSort: Person[]) => {
    const sortParam: SortField = searchParams.get('sort') as SortField;
    const orderParam: SortOrder = searchParams.get('order') as SortOrder;
    const sortedPeople = [...peopleToSort];

    switch (sortParam) {
      case SortField.Name:
        sortedPeople.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case SortField.Sex:
        sortedPeople.sort((a, b) => a.sex.localeCompare(b.sex));
        break;

      case SortField.Born:
        sortedPeople.sort((a, b) => a.born - b.born);
        break;

      case SortField.Died:
        sortedPeople.sort((a, b) => a.died - b.died);
        break;

      default:
        break;
    }

    if (orderParam === SortOrder.Desc) {
      sortedPeople.reverse();
    }

    return sortedPeople;
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  useEffect(() => {
    const filtered = filterPeople(people);
    const sorted = sortPeople(filtered);

    setFilteredPeople(sorted);
  }, [searchParams, people, filterPeople, sortPeople]);

  return (
    <PeopleContext.Provider
      value={{
        people: filteredPeople,
        setPeople,
        isLoading,
        setLoading,
        isError,
        setError,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
