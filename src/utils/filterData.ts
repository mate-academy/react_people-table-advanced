import { Person } from '../types';

const filterBySex = (data: Person[], personSex: string) => {
  if (!personSex.length) {
    return data;
  }

  return (data.filter(h => h.sex === personSex));
};

const filterByName = (data: Person[], queryName: string) => {
  if (!queryName.length) {
    return data;
  }

  return (
    data.filter(person => {
      return (
        person.name.toLowerCase().includes(queryName.toLowerCase())
        || (person.fatherName
          && person.fatherName
            .toLowerCase()
            .includes(queryName.toLowerCase()))
        || (person.motherName
          && person.motherName
            .toLowerCase()
            .includes(queryName.toLowerCase()))
      );
    })
  );
};

const filterByCenturies = (data: Person[], bornCenturies: string[]) => {
  if (!bornCenturies.length) {
    return data;
  }

  return (
    data.filter(person => {
      return (
        bornCenturies.includes(String(Math.floor((person.born) / 100) + 1))
      );
    })
  );
};

export const filterData = (
  dataToFilter: Person[],
  searchPar: URLSearchParams,
) => {
  const personSex = searchPar.get('sex') || '';
  const queryValue = searchPar.get('query') || '';
  const personCenturies = searchPar.getAll('centuries') || [];

  const bySex = filterBySex(dataToFilter, personSex);
  const byName = filterByName(bySex, queryValue);
  const byCenturies = filterByCenturies(byName, personCenturies);

  return byCenturies;
};
