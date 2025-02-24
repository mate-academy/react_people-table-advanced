import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { useSearchParams } from 'react-router-dom';
import { Sex } from '../../types/sex';
import { Category } from '../../types/categoty';

export const useFilteredPeople = (people: Person[]) => {
  const [searchParams] = useSearchParams();
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(people);

  useEffect(() => {
    let filteredList = [...people];
    const query = searchParams.get('query') || '';
    const centuries = searchParams.getAll('centuries') || [];

    const lowerCaseQuery = query.toLowerCase().trim();

    filteredList = people.filter(
      person =>
        person.name.toLowerCase().includes(lowerCaseQuery) ||
        person.motherName?.toLowerCase().includes(lowerCaseQuery) ||
        person.fatherName?.toLowerCase().includes(lowerCaseQuery),
    );

    if (!query) {
      searchParams.delete('query');
    }

    if (centuries.length) {
      filteredList = filteredList.filter(person =>
        centuries.includes(String(Math.ceil(+person.born / 100))),
      );
    }

    const sexFilter = searchParams.get('sex');

    if (sexFilter == Sex.MALE) {
      filteredList = filteredList.filter(person => person.sex === Sex.MALE);
    } else if (sexFilter == Sex.FEMALE) {
      filteredList = filteredList.filter(person => person.sex === Sex.FEMALE);
    }

    const sortBy = searchParams.get('sort');
    const sortOrder = searchParams.get('order');

    if (sortBy === Category.name) {
      filteredList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === Category.born) {
      filteredList.sort((a, b) => a.born - b.born);
    } else if (sortBy === Category.died) {
      filteredList.sort((a, b) => a.died - b.died);
    } else if (sortBy === Category.sex) {
      filteredList.sort((a, b) => a.sex.localeCompare(b.sex));
    }

    if (sortOrder) {
      filteredList.reverse();
    }

    setFilteredPeople(filteredList);
  }, [people, searchParams]);

  return filteredPeople;
};
