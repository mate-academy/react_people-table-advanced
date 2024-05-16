import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';

interface IPeopleContext {
  people: Person[];
  activePerson?: Person;
  error: boolean;
  pending: boolean;
  filters: Record<string, any>;
}

const PeopleContext = createContext<IPeopleContext>({
  people: [],
  error: false,
  pending: false,
  filters: {},
});

export const PeopleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);
  const { slug } = useParams();

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const q = searchParams.get('q');
  const centuries = searchParams.getAll('century');

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
      people.filter(
        person =>
          (!sex || person.sex === sex) &&
          (!q || person.name.toLowerCase().includes(q?.toLowerCase())) &&
          (!centuries.length ||
            centuries.includes(
              Math.ceil(person.born / 100).toString() ||
                Math.ceil(person.died / 100).toString(),
            )),
      ),
    [people, sex, q, centuries],
  );

  const value = {
    people: filteredPeople,
    activePerson,
    error,
    pending,
    filters: { sex, centuries, q },
  };
  console.log(slug);
  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

export const usePeople = () => useContext(PeopleContext);
