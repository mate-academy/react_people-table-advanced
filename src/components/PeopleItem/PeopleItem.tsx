import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person;
};

export const PeopleItem: React.FC<Props> = ({ person }) => {
  const { pathname: currLocationLink } = useLocation();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': currLocationLink.includes(`/people/${person.slug}`),
      })}
    >
      <td>
        <PersonLink person={person} personName={person.name} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        <PersonLink person={person.mother} personName={person.motherName} />
      </td>
      <td>
        <PersonLink person={person.father} personName={person.fatherName} />
      </td>
    </tr>
  );
};
