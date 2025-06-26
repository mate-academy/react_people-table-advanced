import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';
import cn from 'classnames';

type Props = {
  person: Person;
  peopleList: Person[];
  selectedSlug?: string;
};

export const PersonElement = ({ person, peopleList, selectedSlug }: Props) => {
  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': selectedSlug === person.slug })}
    >
      <td>
        <PersonLink name={person.name} peopleList={peopleList} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        <PersonLink name={person.motherName} peopleList={peopleList} />
      </td>

      <td>
        <PersonLink name={person.fatherName} peopleList={peopleList} />
      </td>
    </tr>
  );
};
