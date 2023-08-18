import { Person } from "../types"

export const toFlilterPeople = (
  people: Person[],
  order: string | null,
  sort: string | null,
  query: string | null,
  sex: string | null,
  centuries: string[],
  ) => {
    let allPeople = [...people];

    // if (order === 'desc') {
    //   allPeople.reverse();
    // }

    if (sort) {
      allPeople.sort((a, b) => {
        let comparisonResult = 0;

        switch (sort) {
          case 'name':
            comparisonResult = a.name.localeCompare(b.name);
            break;
          case 'sex':
            comparisonResult = a.sex.localeCompare(b.sex);
            break;
          case 'born':
            comparisonResult = a.born - b.born;
            break;
          case 'died':
            comparisonResult = a.died - b.died;
            break;
          default:
            comparisonResult = 0;
        }

        return order === 'desc' ? -comparisonResult : comparisonResult;
      });
    }

    if (query) {
      allPeople = allPeople.filter(person => {
        if (person.name.toLowerCase().includes(query.toLowerCase())) {
          return true;
        } else if (person.fatherName?.toLowerCase().includes(query.toLowerCase())) {
          return true;
        } else if (person.motherName?.toLowerCase().includes(query.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      })
    }

    if (sex) {
      allPeople = allPeople.filter(p => p.sex === sex)
    }

    if (centuries.length !== 0) {
      allPeople = allPeople.filter(
        person => centuries.includes(
          Math.ceil(person.born / 100).toString(),
        ),
      );
    }

    return allPeople;
}
