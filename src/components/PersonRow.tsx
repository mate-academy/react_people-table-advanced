import { Person } from '../types';
import { PersonLink } from './PersonLink';
import cn from 'classnames';

const NO_PERSON = '-';

type Props = {
  person: Person;
  people: Person[];
  handlePersonClick: (slug: string) => void;
  selectedPerson: string | null;
};

export const PersonRow: React.FC<Props> = ({
  person,
  people,
  handlePersonClick,
  selectedPerson,
}) => {
  const mother = people.find(p => p.name === person.motherName);
  const father = people.find(p => p.name === person.fatherName);
  const { slug, sex, born, died, motherName, fatherName } = person;

  return (
    <tr
      key={slug}
      data-cy="person"
      className={cn({
        'has-background-warning': slug === selectedPerson,
      })}
      onClick={() => handlePersonClick(slug)}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? <PersonLink person={mother} /> : motherName || NO_PERSON}
      </td>
      <td>
        {father ? <PersonLink person={father} /> : fatherName || NO_PERSON}
      </td>
    </tr>
  );
};
