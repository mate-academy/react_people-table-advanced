import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  selectedPerson: string | undefined;
};

export const PersonItem: React.FC<Props> = ({ person, selectedPerson }) => {
  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPerson === person.slug,
      })}
    >
      <td>
        <PersonLink
          to={person.slug}
          name={person.name}
          sex={person.sex}
        />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {person.mother
        ? (
          <td>
            <PersonLink
              to={person.mother.slug}
              name={person.mother.name}
              sex={person.mother.sex}
            />
          </td>
        )
        : <td>{person.motherName || '-'}</td>}
      {person.father
        ? (
          <td>
            <PersonLink
              to={person.father.slug}
              name={person.father.name}
              sex={person.father.sex}
            />
          </td>
        )
        : <td>{person.fatherName || '-'}</td>}
    </tr>
  );
};
