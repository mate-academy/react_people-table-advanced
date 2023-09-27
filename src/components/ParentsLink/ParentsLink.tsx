import { useContext } from 'react';
import { PeopleContext } from '../../contexts/PeopleContext';
import { PeopleLink } from '../PeopleLink';

type Props = {
  parentName: string | null;
};

export const ParentsLink: React.FC<Props> = ({ parentName }) => {
  const { people } = useContext(PeopleContext);

  if (!parentName) {
    return <>-</>;
  }

  const personByName = people.find(({ name }) => name === parentName);

  if (personByName) {
    return <PeopleLink person={personByName} />;
  }

  return <>{parentName}</>;
};
