import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { ParamsNames, Sex, SortField } from '../constants';
import { useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
type PeopleContextType = {
  people: Person[];
  isLoading: boolean;
  updateCenturies: (centuries: string[], century: string) => string[];
  handleChangeQuery: (e: ChangeEvent<HTMLInputElement>) => void;
  sex: Sex | string;
  query: string;
  centuries: string[];
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
};
type PersonMap = {
  [key: string]: Person;
};
const PeopleContext = createContext<PeopleContextType>({
  people: [],
  isLoading: false,
  updateCenturies: () => [],
  handleChangeQuery: () => {},
  sex: '',
  query: '',
  centuries: [],
  isError: false,
  setIsError: () => {},
});

type Props = {
  children: React.ReactNode;
};
export const PeopleProvider: FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get(ParamsNames.SEX) || '';
  const query = searchParams.get(ParamsNames.QUERY) || '';
  const centuries = searchParams.getAll(ParamsNames.CENTURIES) || [];
  const sort = searchParams.get(ParamsNames.SORT) || '';
  const order = searchParams.get(ParamsNames.ORDER) || '';

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const makeMap = (peopleList: Person[]): PersonMap => {
    return peopleList.reduce<PersonMap>((acc, person) => {
      return {
        ...acc,
        [person.name]: person,
      };
    }, {});
  };

  const updateCenturies = (centuriesArr: string[], century: string) => {
    return centuriesArr.includes(century)
      ? centuriesArr.filter(c => century !== c)
      : [...centuriesArr, century];
  };

  const filteredAndSortedPeople = useMemo(() => {
    const filteredPeople = people.filter(person => {
      const normalizedName = person.name.toLowerCase();
      const normalizedMotherName = person.motherName?.toLowerCase();
      const normalizedFatherName = person.fatherName?.toLowerCase();
      const normalizedQuery = query.toLowerCase();
      const isMatchQuery = [
        normalizedName,
        normalizedMotherName,
        normalizedFatherName,
      ].some(field => field?.includes(normalizedQuery));
      const isMatchSex = sex ? person.sex === sex : true;
      const bornCentury = Math.floor(person.born / 100).toFixed();
      const isMatchCentury = centuries.length
        ? centuries.includes(bornCentury)
        : true;

      return isMatchQuery && isMatchSex && isMatchCentury;
    });

    if (!sort && !order) {
      return filteredPeople;
    }

    return [...filteredPeople].sort((a, b) => {
      switch (sort) {
        case SortField.NAME:
        case SortField.SEX:
          return order
            ? b[sort].localeCompare(a[sort])
            : a[sort].localeCompare(b[sort]);
        case SortField.BORN:
        case SortField.DIED:
          return order ? b[sort] - a[sort] : a[sort] - b[sort];
        default:
          return 0;
      }
    });
  }, [query, people, sex, centuries, sort, order]);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(peopleFromServer => {
        const updatedPeople = peopleFromServer.map(person => {
          const peopleMap = makeMap(peopleFromServer);

          return {
            ...person,
            mother: person.motherName
              ? peopleMap[person.motherName]
              : undefined,
            father: person.fatherName
              ? peopleMap[person.fatherName]
              : undefined,
          };
        });

        setPeople(updatedPeople);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <PeopleContext.Provider
      value={{
        people: filteredAndSortedPeople,
        isLoading,
        updateCenturies,
        handleChangeQuery,
        sex,
        query,
        centuries,
        isError,
        setIsError,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeopleContext = (): PeopleContextType => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('useTodosContext must be used within a TodosProvider');
  }

  return context;
};
