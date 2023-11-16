import { Person } from '../types/Person';
import { Century } from '../types/Filters';
import { TableHeader } from '../types/TableHeader';

type VisiblePeople = {
  people: Person[];
  selectedGender: string | null;
  query: string;
  selectedCenturies: Century[] | string[];
  sortBy: string | null;
  isReversed: string | null;
};

export const getVisiblePeople = ({
  people, selectedGender, query, selectedCenturies, sortBy, isReversed,
}: VisiblePeople) => {
  let visiblePeople = [...people];

  if (selectedGender) {
    visiblePeople = visiblePeople.filter(({ sex }) => {
      switch (selectedGender) {
        case 'm':
          return sex === selectedGender;

        case 'f':
          return sex === selectedGender;

        default:
          return sex;
      }
    });
  }

  if (query) {
    const normalizedQuery = query.toLowerCase();

    visiblePeople = visiblePeople.filter(person => (
      person.name.toLowerCase().includes(normalizedQuery)
      || person.motherName?.toLowerCase().includes(normalizedQuery)
      || person.fatherName?.toLowerCase().includes(normalizedQuery)
    ));
  }

  if (selectedCenturies.length) {
    visiblePeople = visiblePeople.filter(({ born }) => (
      selectedCenturies.includes((born + 100).toString().slice(0, 2) as Century)
    ));
  }

  if (sortBy) {
    visiblePeople.sort((a, b) => {
      switch (sortBy) {
        case TableHeader.Name:
          return a.name.localeCompare(b.name);

        case TableHeader.Sex:
          return a.sex.localeCompare(b.sex);

        case TableHeader.Born:
          return a.born - b.born;

        case TableHeader.Died:
          return a.died - b.died;

        default:
          return 0;
      }
    });

    if (isReversed) {
      visiblePeople.reverse();
    }
  }

  return visiblePeople;
};
