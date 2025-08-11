import { Person } from "../types";

type Filters = {
  sex: string | null;
  query: string;
  centuries: string[];
}

export const getFilteredPeople = (
  people: Person[],
  { sex, query, centuries }: Filters,
) => {
  let filteredPeople = [ ...people ];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  const normalQuery = query.trim().toLowerCase();

  if (normalQuery) {
    filteredPeople = filteredPeople.filter(person => {
      const normalName = person.name.toLowerCase();
      const normalMotherName = person.motherName?.toLowerCase();
      const normalFatherName = person.fatherName?.toLowerCase();

      return (
        normalName.includes(normalQuery) ||
        normalMotherName?.includes(normalQuery) ||
        normalFatherName?.includes(normalQuery)
      );
    });
  }

  if (centuries.length !== 0) {
    filteredPeople = filteredPeople.filter(person =>
      centuries.includes(String(Math.ceil(person.born / 100))),
    )
  }

  return filteredPeople;
}