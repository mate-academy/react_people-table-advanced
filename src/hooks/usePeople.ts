import { useEffect, useState } from 'react';
import { Person } from '../types';
import { ErrorMesages } from '../constants/errorMesages';
import * as apiServices from '../api';

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(ErrorMesages.DEFAULT_ERROR);

  useEffect(() => {
    setLoading(true);
    setErrorMessage(ErrorMesages.DEFAULT_ERROR);

    apiServices
      .getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(ErrorMesages.SOMETHING_WENT_WRONG))
      .finally(() => setLoading(false));
  }, []);

  const findPersonByName = (name: string | null): Person | null => {
    if (!name) {
      return null;
    }

    return people.find(person => person.name === name) || null;
  };

  return { people, loading, errorMessage, findPersonByName };
};
