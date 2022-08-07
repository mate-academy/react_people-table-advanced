import { People } from '../types/People';

const API = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const fetchFunction = async (): Promise<People[]> => {
  const res = await fetch(API);

  let result: People[] = [];

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  } else {
    result = await res.json();

    result = result.map(el => {
      const newObject = { ...el };

      if (newObject.fatherName === null) {
        newObject.fatherName = '';
      }

      if (newObject.motherName === null) {
        newObject.motherName = '';
      }

      return newObject;
    });
  }

  return result;
};
