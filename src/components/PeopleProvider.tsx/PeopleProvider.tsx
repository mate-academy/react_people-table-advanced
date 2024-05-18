/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import React, { useEffect, useMemo, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useSearchParams } from 'react-router-dom';
import { SortType } from '../../types/SortType';
import { getSorted } from '../../utils/getSorted';
import { getSortQuery } from '../../utils/getSortQuery';
import { getSortCentury } from '../../utils/getSortCentury';
type Props = {
  children: React.ReactNode;
};

type ContextType = {
  query: string;
  peopleCopy: Person[];
  order: SortType;
  sort: SortType;
  sex: SortType;
  visiblePeople: Person[];
  loader: boolean;
  errorFromServer: string;
  sortedPeople: (s: SortType, x: SortType, c: string[]) => void;
};

export const PeopleContext = React.createContext<ContextType>({
  query: '',
  peopleCopy: [],
  order: null,
  sort: null,
  sex: null,
  visiblePeople: [],
  loader: false,
  errorFromServer: '',
  sortedPeople: () => [],
});

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [peopleCopy, setPeopleCopy] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [errorFromServer, setErrorFromServer] = useState('');
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const query = searchParams.get('query') || '';
  const century = searchParams.getAll('centuries') || [];

  const sortedPeople = (orders: SortType, sexx: SortType, cent: string[]) => {
    const copyPeople = [...peopleCopy];
    let sorted = getSorted(copyPeople, sort);

    if (orders) {
      sorted = sorted.reverse();
    }

    if (sexx) {
      sorted = sorted.filter(p => p.sex === sexx);
    }

    sorted = getSortQuery(sorted, query);

    if (cent.length > 0) {
      sorted = getSortCentury(sorted, century);
    }

    return sorted;
  };

  const visiblePeople = sortedPeople(order, sex, century);

  useEffect(() => {
    setErrorFromServer('');
    setLoader(true);
    const loadPersons = async () => {
      try {
        const persons = await getPeople();

        if (persons) {
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

  const peopleTools = useMemo(
    () => ({
      query,
      peopleCopy,
      sort,
      order,
      sex,
      sortedPeople,
      visiblePeople,
      loader,
      errorFromServer,
    }),
    [
      peopleCopy,
      errorFromServer,
      loader,
      visiblePeople,
      query,
      sort,
      order,
      sex,
    ],
  );

  return (
    <PeopleContext.Provider value={peopleTools}>
      {children}
    </PeopleContext.Provider>
  );
};
