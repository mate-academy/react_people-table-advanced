import { Person } from '../types/Person';
import { Century } from '../types/Filters';
import { TableHeader } from '../types/TableHeader';

type VisiblePeople = {
  people: Person[];
  selectedGender: string | null;
  query: string;
  selectedCenturies: Century[] | string[];
  sortBy: string | null;
  sortByURL: keyof Person;
  isReversed: string | null;
};

export const getVisiblePeople = ({
  people,
  selectedGender,
  query,
  selectedCenturies,
  sortBy,
  sortByURL,
  isReversed,
}: VisiblePeople) => {
  let visiblePeople = [...people];

  if (selectedGender) {
    visiblePeople = visiblePeople.filter(({ sex }) => {
      switch (selectedGender) {
        case 'm':
        case 'f':
          return sex === selectedGender;

        default:
          return sex;
      }
    });
  }

  if (query) {
    const normalizedQuery = query.toLowerCase();
    const includesQuery = (
      criteria: string | null,
      currentQuery: string,
    ) => {
      return criteria?.toLowerCase().includes(currentQuery);
    };

    visiblePeople = visiblePeople.filter(person => (
      includesQuery(person.name, normalizedQuery)
        || includesQuery(person.motherName, normalizedQuery)
        || includesQuery(person.fatherName, normalizedQuery)
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
        case TableHeader.Sex:
          return (a[sortByURL] as keyof Person)
            .localeCompare((b[sortByURL] as keyof Person));

        case TableHeader.Born:
        case TableHeader.Died:
          return (a[sortByURL] as number) - (b[sortByURL] as number);

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
