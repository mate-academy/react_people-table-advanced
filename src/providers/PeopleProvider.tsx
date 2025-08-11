import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams } from 'react-router-dom';
import { usePeopleParams } from '../hooks/usePeopleParams';
import { getCentaury } from '../utils/peopleUtils';

interface PeopleContextI {
  people: Person[];
  peopleCount: number;
  activePerson?: Person;
  error: boolean;
  pending: boolean;
}

const PeopleContext = createContext<PeopleContextI>({
  people: [],
  peopleCount: 0,
  error: false,
  pending: false,
});

export const PeopleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);
  const { slug } = useParams();
  const { sex, query, centauries, sort, order } = usePeopleParams();

  useEffect(() => {
    setPending(true);
    getPeople()
      .then(data => {
        const mapped = data.reduce<{ [key: string]: Person }>(
          (prev, curr) => ({
            ...prev,
            [curr.name]: curr,
          }),
          {},
        );

        setPeople(
          data.map(d => ({
            ...d,
            mother: d.motherName ? mapped[d.motherName] : undefined,
            father: d.fatherName ? mapped[d.fatherName] : undefined,
          })),
        );
      })
      .catch(() => setError(true))
      .finally(() => setPending(false));
  }, []);

  const activePerson = useMemo(
    () => people.find(p => p.slug === slug),
    [slug, people],
  );

  const filteredPeople = useMemo(
    () =>
      people.filter(p => {
        const trimedQuery = query.toLocaleLowerCase().trim();

        return (
          (!centauries.length ||
            centauries.includes(getCentaury(p.born).toString()) ||
            centauries.includes(getCentaury(p.died).toString())) &&
          (!query ||
            p.name.toLowerCase().includes(trimedQuery) ||
            p.motherName?.toLowerCase().includes(trimedQuery) ||
            p.fatherName?.toLowerCase().includes(trimedQuery)) &&
          (!sex || p.sex === sex)
        );
      }),
    [centauries, people, query, sex],
  );

  const sortedPeople = useMemo(() => {
    if (!sort) {
      return filteredPeople;
    }

    const sorted = filteredPeople.sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'sex':
          return a.sex.localeCompare(b.sex);
        case 'born':
          return a.born - b.born;
        case 'died':
          return a.died - b.died;
        default:
          return 0;
      }
    });

    return order === 'desc' ? sorted.reverse() : sorted;
  }, [filteredPeople, order, sort]);

  const value = {
    people: sortedPeople,
    peopleCount: people.length,
    activePerson,
    error,
    pending,
  };

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

export const usePeople = () => useContext(PeopleContext);
