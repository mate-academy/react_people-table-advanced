import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  createContext,
  useMemo,
} from 'react';
import { Person, SortField } from './types';
import { useSearchParams } from 'react-router-dom';

export const PeopleContext = createContext<{
  people: Person[];
  setPeople: Dispatch<SetStateAction<Person[]>>;
}>({
  people: [],
  setPeople: () => {},
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const filterSex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort') as SortField | null;
  const sortOrder = searchParams.get('order');

  const peopleWithParents = useMemo(() => {
    return people.map(person => ({
      ...person,
      mother: people.find(p => p.name === person.motherName),
      father: people.find(p => p.name === person.fatherName),
    }));
  }, [people]);

  const sortPeople = useMemo(() => {
    if (!sortField && !sortOrder) {
      return peopleWithParents;
    } else {
      return [...peopleWithParents].sort((a, b) => {
        switch (sortField) {
          case 'sex':
          case 'name':
            return sortOrder === 'desc'
              ? b[sortField].localeCompare(a[sortField])
              : a[sortField].localeCompare(b[sortField]);
          case 'born':
          case 'died':
            return sortOrder === 'desc'
              ? b[sortField] - a[sortField]
              : a[sortField] - b[sortField];
          default:
            return 0;
        }
      });
    }
  }, [peopleWithParents, sortField, sortOrder]);

  const filtersSex = sortPeople.filter(person => {
    if (filterSex === 'm') {
      return person.sex === 'm';
    }

    if (filterSex === 'f') {
      return person.sex === 'f';
    }

    return true;
  });

  const filterQuery = filtersSex.filter(person => {
    if (!query) {
      return filtersSex;
    }

    const name = person.name.toLowerCase();
    const motherName = person.motherName?.toLowerCase() || '';
    const fatherName = person.fatherName?.toLowerCase() || '';
    const quer = query.toLowerCase().trim();

    return (
      name.includes(quer) ||
      motherName.includes(quer) ||
      fatherName.includes(quer)
    );
  });

  const filterCenturies = useMemo<Person[]>(() => {
    if (!centuries || centuries.length === 0) {
      return filterQuery;
    }

    return filterQuery.filter(person => {
      const bornCentury = Math.ceil(person.born / 100);

      return centuries.includes(bornCentury.toString());
    });
  }, [centuries, filterQuery]);

  return (
    <PeopleContext.Provider value={{ people: filterCenturies, setPeople }}>
      {children}
    </PeopleContext.Provider>
  );
};
