import { Person } from './react-app-env';

type Props = {
  person: Person,
};

export const PersonName: React.FC<Props> = ({ person }) => {
  return (
    <p>{person.name}</p>
  );
};
