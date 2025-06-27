import { Person } from '../types';
import { Gender } from '../types/Gender';
import { SortField } from '../types/SortField';

export function getVisiblePeople(
  allPeople: Person[],
  query: string,
  selectedGender: string,
  selectedCentury: string[],
  currentSort: string | null,
  currentOrder: string | null,
) {
  let visiblePeople = [...allPeople];
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
    visiblePeople = visiblePeople.filter(person => {
      return (
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery)
      );
    });
  }

  if (selectedGender !== Gender.All) {
    visiblePeople = visiblePeople.filter(
      person => person.sex === selectedGender,
    );
  }

  if (selectedCentury.length !== 0) {
    visiblePeople = visiblePeople.filter(person =>
      selectedCentury.includes(`${Math.ceil(person.born / 100)}`),
    );
  }

  switch (currentSort) {
    case SortField.Name:
      visiblePeople.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case SortField.Sex:
      visiblePeople.sort((a, b) => a.sex.localeCompare(b.sex));
      break;
    case SortField.Born:
      visiblePeople.sort((a, b) => a.born - b.born);
      break;
    case SortField.Died:
      visiblePeople.sort((a, b) => a.died - b.died);
      break;
  }

  if (currentOrder) {
    visiblePeople.reverse();
  }

  return visiblePeople;
}
