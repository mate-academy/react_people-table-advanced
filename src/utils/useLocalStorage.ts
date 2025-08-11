import { useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useFilter } from './useFilter';
import { FieldTypes } from '../types/FieldTypes';

export function useLocalStorage() {
  const [dataFromServer, setDataFromServer] = useState<Person[]>([]);
  const [isUploadError, setIsUploadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isEmptyError = !dataFromServer.length && !isUploadError && !isLoading;

  const { query, sex, order, sort, activeCenturies } = useFilter();

  function getVisibleData(data: Person[]) {
    let visibleData = data.map(person => {
      const mother = data.find(relative => person.motherName === relative.name);
      const father = data.find(relative => person.fatherName === relative.name);

      return { ...person, mother, father };
    });

    if (!!activeCenturies.length) {
      visibleData = visibleData.filter(person =>
        activeCenturies.includes(String(Math.ceil(+person.born / 100))),
      );
    }

    if (sex) {
      visibleData = visibleData.filter(person => person.sex === sex);
    }

    if (query) {
      const normalizedQuery = query.trim().toLowerCase();

      visibleData = visibleData.filter(person =>
        person.name.toLowerCase().includes(normalizedQuery),
      );
    }

    if (sort) {
      switch (sort) {
        case FieldTypes.NAME.toLowerCase():
          visibleData = [...visibleData].sort((person1, person2) =>
            person1.name.localeCompare(person2.name),
          );
          break;
        case FieldTypes.SEX.toLowerCase():
          visibleData = [...visibleData].sort((person1, person2) =>
            person1.sex.localeCompare(person2.sex),
          );
          break;
        case FieldTypes.BORN.toLowerCase():
          visibleData = [...visibleData].sort(
            (person1, person2) => person1.born - person2.born,
          );
          break;
        case FieldTypes.DIED.toLowerCase():
          visibleData = [...visibleData].sort(
            (person1, person2) => person1.died - person2.died,
          );
          break;
      }
    }

    return order ? visibleData.reverse() : visibleData;
  }

  getPeople()
    .then(data => {
      setDataFromServer(getVisibleData(data));
      setIsLoading(false);
    })
    .catch(() => {
      setIsLoading(false);
      setIsUploadError(true);
    });

  return { dataFromServer, isUploadError, isLoading, isEmptyError };
}
