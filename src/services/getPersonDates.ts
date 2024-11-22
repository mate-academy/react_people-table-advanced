import { useContext } from 'react';
import { PeopleContext } from '../store/PeopleContent';

function ExtractDates(name: string | null) {
  const { people } = useContext(PeopleContext);
  const parentOfKid = people.find(personEl => personEl.name === name);

  if (!parentOfKid) {
    return undefined;
  }

  const parentBirthDate = parentOfKid?.born;

  const parentNameDivided = parentOfKid?.name
    .split(' ')
    .join('-')
    .toLowerCase();

  const parentDates = parentNameDivided + '-' + parentBirthDate;

  return parentDates;
}

export function GetPersonDates(personName: string | null, parent: string) {
  switch (parent) {
    case 'mother':
      return ExtractDates(personName);
    case 'father':
      return ExtractDates(personName);

    default:
      return;
  }
}
