import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getPeople } from '../api';

export function usePeople() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then((response) => {
        setPeople(response.map(person => ({
          ...person,
          mother: response.find(
            ({ name }) => name === person.motherName,
          ) || null,
          father: response.find(
            ({ name }) => name === person.fatherName,
          ) || null,
        })));
      });
  }, []);

  return [people, setPeople];
}

export function useSearchParams() {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const updateSearchParams = (key, value) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }

    history.push({ search: searchParams.toString() });
  };

  return [searchParams, updateSearchParams];
}
