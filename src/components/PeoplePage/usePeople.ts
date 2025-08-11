import { useEffect, useState } from 'react';

import { Person } from '../../types';
import { getPeople } from '../../api';
import { addParentsToPeople } from './services/addParentsToPeople';
import { useSearchParams } from 'react-router-dom';
import { URLSearchParams } from 'url';

interface UsePeopleResult {
  people: Person[];
  isLoading: boolean;
  hasError: boolean;
  searchParams: URLSearchParams;
}

export const usePeople = (): UsePeopleResult => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(res => setPeople(addParentsToPeople(res)))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return { people, isLoading, hasError, searchParams };
};
