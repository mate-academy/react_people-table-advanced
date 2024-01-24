import {
  FC, ReactNode, createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';

type Props = {
  children: ReactNode,
};

type FilterProviderT = {
  people: Person[],
  isLoading: boolean,
  error: boolean,
//   sortType: any,
//   isReversed: boolean,
};

// enum SortType {
//   NONE,
//   NAME,
//   SEX,
//   BORN,
//   DIED,
// }

//   type ReorderOptions = {
//     sortType: SortType,
//     isReversed: boolean,
//   };

const FilterContext = createContext<FilterProviderT>({
  people: [],
  isLoading: false,
  error: false,
//   sortType: '',
//   isReversed: false,
});

const prepareData = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(
      motherObject => motherObject.name === person.motherName,
    );
    const father = people.find(
      fatherObject => fatherObject.name === person.fatherName,
    );

    const personCopy = {
      ...person,
      mother,
      father,
    };

    return personCopy;
  });
};

type Filters = {
  sex: string | null;
  centuries: string[];
  query: string | null;
}
;
const filterData = (people: Person[], { sex, centuries, query }: Filters) => {
  let filteredData = [...people];

  if (sex) {
    filteredData = filteredData.filter((person) => person.sex === sex);
  }

  if (centuries.length > 0) {
    filteredData = filteredData.filter(
      (person) => centuries.find(
        century => Math.floor(person.born / 100) === Number(century),
      ),
    );
  }

  if (query) {
    const preparedInput = query.toLocaleLowerCase().trim();

    filteredData = filteredData.filter(
      (person) => person.name.toLocaleLowerCase().includes(preparedInput),
    );
  }

  return filteredData;
};

// const getReorderedPeople = (
//   people: Person[],
//   { sortType, isReversed }: ReorderOptions,
// ) => {
//   let visiblePeople = [...people];

//   if (sortType === SortType.NAME) {
//     visiblePeople = visiblePeople.sort((a, b) => {
//       return a.name.localeCompare(b.name);
//     });
//   }

//   if (sortType === SortType.NAME) {
//     visiblePeople = visiblePeople.sort((a, b) => {
//       return a.sex.localeCompare(b.sex);
//     });
//   }

//   if (sortType === SortType.BORN) {
//     visiblePeople = visiblePeople.sort((a, b) => {
//       return a.born - b.born;
//     });
//   }

//   if (sortType === SortType.DIED) {
//     visiblePeople = visiblePeople.sort((a, b) => {
//       return a.born - b.born;
//     });
//   }

//   if (isReversed) {
//     visiblePeople = visiblePeople.reverse();
//   }

//   return visiblePeople;
// };

const FilterProvider: FC<Props> = ({ children }) => {
  const [URLSearchParams] = useSearchParams();
  const centuries = URLSearchParams.getAll('centuries');
  const query = URLSearchParams.get('query');
  const sex = URLSearchParams.get('sex');

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const peopleToRender = useMemo(() => {
    return filterData(people, { sex, centuries, query });
  }, [people, centuries, query, sex]);

  //   const [isReversed, setIsReversed] = useState(false);
  //   const [sortType, setSortType] = useState(SortType.NONE);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((data) => {
        setPeople(prepareData(data));
        // setPeople(getReorderedPeople(people, { sortType, isReversed }));
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  //   const handleSortByName = () => {
  //     setSortType(SortType.NAME);
  //     setIsReversed(!isReversed);
  //   };

  //   const handleSortBySex = () => {
  //     setSortType(SortType.SEX);
  //     setIsReversed(!isReversed);
  //   };

  //   const handleSortByBorn = () => {
  //     setSortType(SortType.BORN);
  //     setIsReversed(!isReversed);
  //   };

  //   const handleSortByDied = () => {
  //     setSortType(SortType.DIED);
  //     setIsReversed(!isReversed);
  //   };

  const value: FilterProviderT = {
    people: peopleToRender,
    isLoading,
    error,
    // sortType,
    // isReversed,
    // handleSortByBorn,
    // handleSortByDied,
    // handleSortByName,
    // handleSortBySex,
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;

export const useFilters = () => useContext(FilterContext);
