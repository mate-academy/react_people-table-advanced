import { Person } from '../types';
import SearchParam from '../constants/searchParam';
// import { getCenturyFromYear, isComesUnderSearch } from "../utils/peopleHelper";
import { Order } from '../constants/Order';
import Sex from '../constants/Sex';
import { SortBy } from '../constants/SortBy';
import { NullOr } from '../types/helperTypes';

export const getPeopleByName = (people: Person[], name: string | null) => {
  return people.find(person => person.name === name) || null;
};

export const getCenturyFromYear = (year: number) => Math.ceil(year / 100);

export const isComesUnderSearch = (person: Person, search: string) => {
  const lowerSearch = search.toLowerCase();

  if (person.name.toLowerCase().includes(lowerSearch)) {
    return true;
  }

  if (person.motherName?.toLowerCase().includes(lowerSearch)) {
    return true;
  }

  if (person.fatherName?.toLowerCase().includes(lowerSearch)) {
    return true;
  }

  return false;
};

export const getFilteredPeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  const currentSex = searchParams.get(SearchParam.Sex) as NullOr<Sex>;
  const currentCenturies = searchParams.getAll(SearchParam.Centuries);
  const currentSearch = searchParams.get(SearchParam.Search) || '';

  if (!currentSex && !currentSearch && !currentCenturies.length) {
    return people;
  }

  return people.filter((person: Person): boolean => {
    if (currentSex && person.sex !== currentSex) {
      return false;
    }

    if (currentCenturies.length) {
      if (!currentCenturies.includes(`${getCenturyFromYear(person.born)}`)) {
        return false;
      }
    }

    if (!isComesUnderSearch(person, currentSearch)) {
      return false;
    }

    return true;
  });
};

export const getReversedPeople = (
  initialPeople: Person[],
  searchParams: URLSearchParams,
) => {
  const orderBy = searchParams.get(SearchParam.Order) as NullOr<Order>;
  const people = [...initialPeople];

  return orderBy ? people.reverse() : initialPeople;
};

export const getSortedPeople = (
  initialPeople: Person[],
  searchParams: URLSearchParams,
) => {
  const sortQuery = searchParams.get(SearchParam.Sort) as NullOr<SortBy>;
  const people = [...initialPeople];

  switch (sortQuery) {
    case SortBy.Name:
    case SortBy.Sex:
      return people.sort((person1, person2) => (
        person1[sortQuery].localeCompare(person2[sortQuery])
      ));
    case SortBy.Born:
    case SortBy.Died:
      return people.sort((person1, person2) => (
        person1[sortQuery] - person2[sortQuery]
      ));
    case null:
      return people;
    default:
      throw new Error('If you change SortBy type, change this switch also');
  }
};
