import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { calculateCentury } from '../utils/calculateCentury';
import { Person } from '../types';
import { filterPeople } from '../utils/people/filterPeople';
import { sortPeploe } from '../utils/people/sortPeople';
import { getPeople } from '../api';

export const usePeople = () => {
  const [searchParams] = useSearchParams();

  const sexSearchParam = searchParams.get('sex') || '';
  const querySearchParam = searchParams.get('query') || '';
  const centuriesSearchParams = searchParams.getAll('centuries') || [];

  const sortSearchParam = searchParams.get('sort') || '';
  const orderSearchParam = searchParams.get('order') || '';

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { slug } = useParams();

  const ageGroup = people.reduce<string[]>((acc, person) => {
    const century = calculateCentury(+person.born);

    if (!acc.includes(century)) {
      return [...acc, century];
    }

    return acc;
  }, []);

  const peopleWithParents = people.reduce<Person[]>((acc, person) => {
    const findedMother = people.find(human => human.name === person.motherName);

    const findedFather = people.find(human => human.name === person.fatherName);

    return [
      ...acc,
      {
        ...person,
        mother: findedMother,
        father: findedFather,
      },
    ];
  }, []);

  const filteredPeople = filterPeople(peopleWithParents, {
    sexSearchParam,
    querySearchParam,
    centuriesSearchParams,
  });

  const visiblePeople = sortPeploe(filteredPeople, {
    sortSearchParam,
    orderSearchParam,
  });

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const isEmptyPeople = people.length === 0;

  return {
    isLoading,
    isError,
    isEmptyPeople,
    slug,
    ageGroup,
    visiblePeople,
  };
};
