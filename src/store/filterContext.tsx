import { Person } from '../types';
import React, { createContext, useContext } from 'react';
import { usePeople } from './PeopleContext';
import { useSearchParams } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

type FilterState = {
  visiblePeople: Person[];
};

const FilterContext = createContext<FilterState>({
  visiblePeople: [],
});

export const FilterProvider: React.FC<Props> = ({ children }) => {
  const { people } = usePeople();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const order = searchParams.get('order');
  const sort = searchParams.get('sort');

  const visiblePeople = () => {
    let filteredPeople = [...people];

    if (!people) {
      return;
    }

    if (query) {
      filteredPeople = filteredPeople.filter(
        (person: Person) =>
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          (person.motherName &&
            person.motherName.toLowerCase().includes(query.toLowerCase())) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(query.toLowerCase())),
      );
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(
        (person: Person) => person.sex === sex,
      );
    }

    if (centuries.length > 0) {
      filteredPeople = filteredPeople.filter((person: Person) => {
        return centuries.some(century => {
          const norm = parseInt(century);
          const start = (norm - 1) * 100 + 1;
          const end = norm * 100;

          return person.born <= end && person.died >= start;
        });
      });
    }

    if (sort) {
      switch (sort) {
        case 'name':
          filteredPeople = filteredPeople.sort((a: Person, b: Person) =>
            a.name.localeCompare(b.name),
          );
          break;

        case 'sex':
          filteredPeople = filteredPeople.sort((a: Person, b: Person) =>
            a.sex.localeCompare(b.sex),
          );
          break;

        case 'born':
          filteredPeople = filteredPeople.sort(
            (a: Person, b: Person) => a.born - b.born,
          );
          break;

        case 'died':
          filteredPeople = filteredPeople.sort(
            (a: Person, b: Person) => a.died - b.died,
          );
          break;

        default:
          break;
      }

      if (order === 'desc') {
        filteredPeople = filteredPeople.reverse();
      }
    }

    return filteredPeople;
  };

  return (
    <FilterContext.Provider value={{ visiblePeople: visiblePeople() || [] }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }

  return context;
};
