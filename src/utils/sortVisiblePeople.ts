import { Person } from '../types';

export const sortVisiblePeople = (
  people: Person[],
  sortBy: string | null,
  reversed: boolean,
) => {
  let visiblePeople = [...people];

  switch (sortBy) {
    case 'name':
    case 'sex':
      visiblePeople = visiblePeople.sort((a, b) => (
        a[sortBy].localeCompare(b[sortBy])
      ));
      break;

    case 'born':
    case 'died':
      visiblePeople = visiblePeople.sort((a, b) => (
        a[sortBy] - b[sortBy]
      ));
      break;

    default:
      return visiblePeople;
  }

  if (reversed) {
    visiblePeople = visiblePeople.reverse();
  }

  return visiblePeople;
};
