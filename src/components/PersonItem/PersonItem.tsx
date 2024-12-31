import cn from 'classnames';

import { NO_PARENT_INFO } from '../../constants/constants';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[];
  selected: boolean;
};

export const PersonItem: React.FC<Props> = ({ person, people, selected }) => {
  const { sex, born, died, motherName, fatherName } = person;

  const mother = people.find(mom => mom.name === motherName);
  const father = people.find(dad => dad.name === fatherName);

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={cn({ 'has-background-warning': selected })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          <p>{motherName || NO_PARENT_INFO}</p>
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          <p>{fatherName || NO_PARENT_INFO}</p>
        )}
      </td>
    </tr>
  );
};
