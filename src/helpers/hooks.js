import { useState, useEffect } from 'react';
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
