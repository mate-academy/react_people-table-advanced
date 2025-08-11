import { Person } from '../types';

export const filterAndSort = (
  people: Person[],
  searchparams: URLSearchParams,
) => {
  const filterSex = searchparams.get('sex') || '';
  const filterCenturies = searchparams.getAll('century') || [];
  const filterQuery = searchparams.get('query') || '';
  const sortBy = searchparams.get('sort') || '';
  const orderBy = searchparams.get('order') || '';

  const filteredPeople = people.filter(person => {
    const { name, motherName, fatherName, sex, born } = person;

    if (filterSex && sex !== filterSex) {
      return false;
    }

    const century = Math.ceil(born / 100);

    if (
      filterCenturies.length !== 0 &&
      !filterCenturies.includes(century.toString())
    ) {
      return false;
    }

    return (
      name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      motherName?.toLowerCase().includes(filterQuery.toLowerCase()) ||
      fatherName?.toLowerCase().includes(filterQuery.toLowerCase())
    );
  });

  const sortedPeople = filteredPeople.sort((person1, person2) => {
    switch (sortBy) {
      case 'born':
      case 'died':
        return person1[sortBy] - person2[sortBy];

      case 'sex':
      case 'name':
        return person1[sortBy].localeCompare(person2[sortBy]);

      default:
        return 0;
    }
  });

  if (orderBy === 'desc') {
    sortedPeople.reverse();
  }

  return sortedPeople;
};
