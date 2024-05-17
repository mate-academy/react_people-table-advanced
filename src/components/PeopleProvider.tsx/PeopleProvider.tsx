import React, { useEffect, useMemo, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useSearchParams } from 'react-router-dom';
type Props = {
  children: React.ReactNode;
};

type SortType = string | null;

type ContextType = {
  peopleCopy: Person[];
  order: SortType;
  sort: SortType;
  sex: SortType;
  people: Person[];
  setPeople: (v: Person[]) => void;
  loader: boolean;
  errorFromServer: string;
  sortedPeople: (
    o: SortType,
    s: SortType,
    x: SortType,
    y: SortType,
    c: string[],
  ) => void;
};

export const PeopleContext = React.createContext<ContextType>({
  peopleCopy: [],
  order: null,
  sort: null,
  sex: null,
  people: [],
  setPeople: () => [],
  loader: false,
  errorFromServer: '',
  sortedPeople: () => [],
});

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleCopy, setPeopleCopy] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [errorFromServer, setErrorFromServer] = useState('');
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const query = searchParams.get('query') || '';
  const century = useMemo(
    () => searchParams.getAll('centuries'),
    [searchParams],
  );

  const sortedPeople = (
    sorts: SortType,
    orders: SortType,
    sexx: SortType,
    querty: SortType,
    cent: string[],
  ) => {
    const copyPeople = [...peopleCopy];
    const sorted = copyPeople.sort((a, b) => {
      if ((sorts === 'name' || sorts === 'sex') && !orders) {
        return a[sorts].localeCompare(b[sorts]);
      } else if ((sorts === 'born' || sorts === 'died') && !orders) {
        return a[sorts] - b[sorts];
      } else if (sorts === 'name' && orders) {
        return b[sorts].localeCompare(a[sorts]);
      } else if ((sorts === 'born' || sorts === 'died') && orders) {
        return b[sorts] - a[sorts];
      } else {
        return 0;
      }
    });

    if (sexx && !orders) {
      setPeople(sorted.filter(p => p.sex === sexx));
    } else if (sorts === 'sex' && orders && !sexx) {
      const newSorted = copyPeople
        .sort((a, b) => a.sex.localeCompare(b.sex))
        .reverse();

      setPeople(newSorted);
    } else if (sorts === 'sex' && orders && sexx) {
      const newSorted = copyPeople.filter(a => a.sex === sexx).reverse();

      setPeople(newSorted);
    } else {
      setPeople(sorted);
    }

    if (querty) {
      const lowerQuerty = querty.toLowerCase();

      setPeople(prevPeople =>
        prevPeople.filter(
          person =>
            person.name.toLowerCase().includes(lowerQuerty) ||
            person.motherName?.toLowerCase().includes(lowerQuerty) ||
            person.fatherName?.toLowerCase().includes(lowerQuerty),
        ),
      );
    }

    if (cent.length > 0) {
      const min = Math.min(...cent.map(Number)) * 100 - 100;
      const max = Math.max(...cent.map(Number)) * 100;

      setPeople(prevPeople =>
        prevPeople.filter(pers => pers.born >= min && pers.born <= max),
      );
    }
  };

  useEffect(() => {
    sortedPeople(sort, order, sex, query, century);
  }, [sort, order, sex, loader, query, century]);

  useEffect(() => {
    setErrorFromServer('');
    setLoader(true);
    const loadPersons = async () => {
      try {
        const persons = await getPeople();

        if (persons) {
          setPeople(persons);
          setPeopleCopy(persons);
        }
      } catch (error) {
        setErrorFromServer('Something went wrong');
      } finally {
        setLoader(false);
      }
    };

    loadPersons();
  }, []);

  const peopleTools = {
    peopleCopy,
    sort,
    order,
    sex,
    sortedPeople,
    people,
    setPeople,
    loader,
    errorFromServer,
  };

  return (
    <PeopleContext.Provider value={peopleTools}>
      {children}
    </PeopleContext.Provider>
  );
};
