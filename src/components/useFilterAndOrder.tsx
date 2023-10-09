import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';

export const useFilterAndOrder = (people: Person[]) => {
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(people);
  const [sortedPeople, setSortedPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setFilteredPeople(people.filter(person => person.name.toLowerCase()
      .includes(searchParams.get('query')?.toLowerCase() || '')
    || person.motherName?.toLowerCase().includes(searchParams
      .get('query')?.toLowerCase() || '')
    || person.fatherName?.toLowerCase().includes(searchParams
      .get('query')?.toLowerCase() || ''))
      .filter(person => (searchParams.get('sex')
        ? person.sex === searchParams.get('sex')
        : person.sex))
      .filter(person => (searchParams
        .getAll('century').length > 0
        ? searchParams
          .getAll('century').includes(Math.floor(person.born / 100).toString())
        : person)));
  }, [searchParams, people]);

  useMemo(() => {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    switch (true) {
      case (sort === 'name'
          && !order):
        setSortedPeople(filteredPeople
          .sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case (sort === 'name'
          && !!order):
        setSortedPeople(filteredPeople
          .sort((a, b) => b.name.localeCompare(a.name)));
        break;
      case (sort === 'sex'
          && !order):
        setSortedPeople(filteredPeople
          .sort((a, b) => a.sex.localeCompare(b.sex)));
        break;
      case (sort === 'sex'
          && !!order):
        setSortedPeople(filteredPeople
          .sort((a, b) => b.sex.localeCompare(a.sex)));
        break;
      case (sort === 'born'
          && !order):
        setSortedPeople(filteredPeople
          .sort((a, b) => a.born - b.born));
        break;
      case (sort === 'born'
          && !!order):
        setSortedPeople(filteredPeople
          .sort((a, b) => b.born - a.born));
        break;
      case (sort === 'died'
          && !order):
        setSortedPeople(filteredPeople
          .sort((a, b) => a.died - b.died));
        break;
      case (sort === 'died'
          && !!order):
        setSortedPeople(filteredPeople
          .sort((a, b) => b.died - a.died));
        break;
      default: setSortedPeople(filteredPeople);
    }
  }, [searchParams, filteredPeople, people]);

  return { sortedPeople, filteredPeople };
};
