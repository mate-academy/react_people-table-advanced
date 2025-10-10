import classNames from 'classnames';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonInfo: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams<{ slug: string }>();
  const selectedPerson = slug || '';

  function findPersonByName(
    peopleFindParent: Person[],
    name?: string | null,
  ): Person | undefined {
    if (!name) {
      return undefined;
    }

    const key = name.trim().toLowerCase();

    return peopleFindParent.find(p => p.name.trim().toLowerCase() === key);
  }

  const mother = findPersonByName(people, person.motherName);
  const father = findPersonByName(people, person.fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === selectedPerson,
      })}
    >
      <PersonLink person={person} fallbackName={person.name} />
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <PersonLink person={mother} fallbackName={person.motherName} />

      <PersonLink person={father} fallbackName={person.fatherName} />
    </tr>
  );
};
