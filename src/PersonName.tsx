import { Person } from './types/Person';

type Props = {
  person: Person,
};

export const PersonName: React.FC<Props> = ({ person }) => {
  return (
    <p>{person.name}</p>
  );
};
