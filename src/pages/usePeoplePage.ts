import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';

export const usePeoplePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((response) => {
        setPeople(response
          .map((person:Person) => Object.assign(person, {
            mother: response.find(p => p.name === person.motherName) || null,
            father: response.find(p => p.name === person.fatherName) || null,
            century: Math.ceil(person.born / 100),
          })));
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const centuriesList = useMemo(() => people
    .reduce((centuriesArray:number[], person:Person) => {
      if (!person.century || centuriesArray.includes(person.century)) {
        return centuriesArray;
      }

      centuriesArray.push(person.century);

      return centuriesArray;
    }, []).sort(), [people]);

  const [searchParams] = useSearchParams();
  const filterPattern = new RegExp((searchParams
    .get('query') || '').trim(), 'i');

  const peopleList = useMemo(() => {
    const filteredAndSorted = people // filter name, motherName, fatherName below
      .filter(({ name, motherName, fatherName }:Person) => name
        .search(filterPattern) > -1 || (motherName && motherName
        .search(filterPattern) > -1) || (fatherName && fatherName
        .search(filterPattern) > -1)) // filter sex below
      .filter(({ sex }:Person) => !searchParams.get('sex')
   || searchParams.get('sex') === sex)
      .filter(({ century }:Person) => searchParams // century filter
        .getAll('century').length === 0 || searchParams
        .getAll('century').includes((century || '')?.toString()))
      .sort((firstPerson: Person, secondPerson: Person) => {
        if (searchParams.get('sort') === null) {
          return 0;
        }

        const sortColumn = searchParams.get('sort') as keyof Person;

        return (typeof firstPerson[sortColumn] === 'string')
          ? (firstPerson[sortColumn] || '').toString()
            .localeCompare((secondPerson[sortColumn] || '').toString())
          : Number(firstPerson[sortColumn]) - Number(secondPerson[sortColumn]);
      });

    return (searchParams.get('order') === 'desc')
      ? filteredAndSorted.reverse() : filteredAndSorted;
  },
  [people, searchParams]);

  const isFiltered = (!searchParams.get('sex')
|| searchParams.getAll('century').length > 0
|| searchParams.get('query'));

  return {
    isLoading,
    people,
    hasError,
    centuriesList,
    isFiltered,
    peopleList,
  };
};
