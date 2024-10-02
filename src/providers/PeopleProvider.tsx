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
  handleSortFilter: (type: string) => void;
  sort: string | null;
  sortOrder: string | null;
}

const PeopleContext = createContext<IPeopleContext>({
  people: [],
  error: false,
  pending: false,
  filters: {},
  handleSortFilter: () => {},
  sort: null,
  sortOrder: null,
});

export const PeopleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);
  const { slug } = useParams<{ slug: string }>();

  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const q = searchParams.get('q');
  const centuries = searchParams.getAll('century');
  const sort = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

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
        setError(false);
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

  const sortedPeople = useMemo(() => {
    if (!sort) {
      return filteredPeople;
    }

    return [...filteredPeople].sort((a, b) => {
      const aValue = a[sort as keyof Person] ?? '';
      const bValue = b[sort as keyof Person] ?? '';

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }, [filteredPeople, sort, sortOrder]);

  const handleSortFilter = (type: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      const currentSort = newParams.get('sort');
      const currentOrder = newParams.get('order');

      if (currentSort === type) {
        if (currentOrder === 'asc') {
          newParams.set('order', 'desc');
        } else if (currentOrder === 'desc') {
          newParams.delete('order');
          newParams.delete('sort');
        } else {
          newParams.set('order', 'asc');
        }
      } else {
        newParams.set('sort', type);
        newParams.set('order', 'asc');
      }

      return newParams;
    });
  };

  const value = {
    people: sortedPeople,
    activePerson,
    error,
    pending,
    filters: { sex, centuries, q },
    handleSortFilter,
    sort,
    sortOrder,
  };

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

export const usePeople = () => useContext(PeopleContext);
