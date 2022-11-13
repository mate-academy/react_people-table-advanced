import { Person } from '../types/Person';

export const getFilteredPeople = (
  dataPeople: Person[],
  query: string,
  sex: string,
  centuries: string[],
) => {
  const queryForFind = query.toLowerCase().trim();
  let peopleFilter = [...dataPeople];

  if (query) {
    peopleFilter = peopleFilter.filter(
      person => (
        person.name.toLowerCase().includes(queryForFind)
        || person.motherName?.toLowerCase().includes(queryForFind)
        || person.fatherName?.toLowerCase().includes(queryForFind)
      ),
    );
  }

  if (sex) {
    peopleFilter = peopleFilter.filter(
      person => person.sex === sex,
    );
  }

  if (centuries.length !== 0) {
    peopleFilter = peopleFilter.filter(
      person => {
        const personBornCentury = Math.ceil(person.born / 100).toString();

        return centuries.includes(personBornCentury);
      },
    );
  }

  return peopleFilter;
};
