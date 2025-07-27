import { useMemo, useState } from "react";
import { Person } from "../types";
import { Filter } from "../types/Filter";
import { useSearchParams } from "react-router-dom";

function centuryMaker(century: number): number {
  return Math.ceil(century / 100);
}

type usePeopleFilteringResult = {
  filterType: Filter;
  filteredPeople: Person[];
};


export const usePeopleFiltering = (people: Person[]): usePeopleFilteringResult => {
  const [searchParams] = useSearchParams();
  const [filterType, setFilterType] = useState<Filter>(null);

  const filteredPeople = useMemo(() => {
    let newPeople = [...people];

    const filters = {
      sex: searchParams.get('sex'),
      centuries: searchParams.getAll('centuries'),
      query: searchParams.get('query'),
    };

    newPeople = newPeople.filter(person => {
      if (filters.sex && person.sex !== filters.sex) {
        return false;
      }

      const bornCentury = centuryMaker(person.born).toString();
      const diedCentury = centuryMaker(person.died).toString();

      if (filters.centuries.length > 0) {
        if (!filters.centuries.includes(bornCentury) && !filters.centuries.includes(diedCentury)) {
          return false;
        }
      }


      if (
        filters.query &&
        !person.name.toLowerCase().includes(filters.query.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    return newPeople;
  }, [people, searchParams]);

  return { filterType, filteredPeople };

}