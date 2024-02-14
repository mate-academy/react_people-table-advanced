import { Person } from '../types';

interface HumanProps {
  person: Person
}

export const Human: React.FC<HumanProps> = ({ person }) => (
  <div>
    {person.name}
  </div>
);
