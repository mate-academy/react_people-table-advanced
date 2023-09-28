import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SortField } from '../types/SortField';
import { SearchOptions } from '../types/SearchOptions';

interface IPeopleContext {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  visiblePeople: Person[];
}

export const PeopleContext = React.createContext({} as IPeopleContext);

type Props = {
  children: React.ReactNode;
};

export const PeopleContextProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get(SearchOptions.Sex) || '';
  const query = searchParams.get(SearchOptions.Query) || '';
  const centuries: string[] = searchParams.getAll(
    SearchOptions.Centuries,
  ) || [];
  const sort = searchParams.get(SearchOptions.Sort) || '';
  const order = searchParams.get(SearchOptions.Order) || '';

  const visiblePeople = useMemo(() => {
    const peopleCopy = people.filter(person => {
      let condition = true;

      if (sex) {
        condition = condition && person.sex === sex;
      }

      if (query) {
        const fixedQuery = query.toLowerCase();

        condition = condition
          && (person.name.toLowerCase().includes(fixedQuery)
            || (person.motherName?.toLowerCase().includes(fixedQuery) || false)
            || person.fatherName?.toLowerCase().includes(fixedQuery) || false);
      }

      if (centuries.length) {
        condition = condition
          && centuries.includes(`${Math.ceil(person.born / 100)}`);
      }

      return condition;
    });

    if (sort) {
      peopleCopy.sort((personA, personB) => {
        switch (sort) {
          case SortField.Name:
            return personA.name.localeCompare(personB.name);
          case SortField.Sex:
            return personA.sex.localeCompare(personB.sex);
          case SortField.Born:
            return personA.born - personB.born;
          case SortField.Died:
            return personA.died - personB.died;
          default:
            return 0;
        }
      });
    }

    if (order) {
      peopleCopy.reverse();
    }

    return peopleCopy;
  }, [people, sex, query, centuries, sort, order]);

  return (
    <PeopleContext.Provider value={{
      people,
      setPeople,
      visiblePeople,
    }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
