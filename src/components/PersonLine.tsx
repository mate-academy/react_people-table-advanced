import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  people: Person[];
};
export const PersonLine: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();

  const getPersonByName = (name: string | null): Person | undefined => {
    return people.find(p => p.name === name);
  };

  const mother = getPersonByName(person.motherName);
  const father = getPersonByName(person.fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames('', {
        'has-background-warning': slug === person.slug,
      })}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {(mother ? <PersonLink person={mother} /> : person.motherName) || '-'}
      </td>
      <td>
        {(father ? <PersonLink person={father} /> : person.fatherName) || '-'}
      </td>
    </tr>
  );
};
