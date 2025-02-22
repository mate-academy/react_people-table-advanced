import { PersonRow } from './PersonRow';

import { Person } from '../../types';

type Props = {
  people: Person[];
  selectedPersonSlug?: Person['slug'];
};

export const PeopleTableBody = ({ people, selectedPersonSlug }: Props) => {
  return (
    <tbody>
      {people.map(person => {
        return (
          <PersonRow
            key={person.slug}
            person={person}
            highlighted={person.slug === selectedPersonSlug}
          />
        );
      })}
    </tbody>
  );
};
