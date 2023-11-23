import { useContext } from 'react';
import { PeopleContext } from '../PeopleContext';
import { PersonLink } from './PersonLink';

export const PeopleTable: React.FC = () => {
  const {
    filterPeople,
  } = useContext(PeopleContext);

  return (
    <tbody>
      {filterPeople()?.map(person => {
        return (
          <PersonLink person={person} key={person.slug} />
        );
      })}
    </tbody>
  );
};
