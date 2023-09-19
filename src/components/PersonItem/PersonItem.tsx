import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person,
  people: Person[];
  handleSlugUser: (value: string) => void;
  slugUser: string | undefined;
  allParams: string;
};

export const PersonItem = ({
  person,
  people,
  handleSlugUser,
  slugUser,
  allParams,
}:Props) => {
  let motherCell;

  if (person.motherName !== null) {
    motherCell = (
      people.some(one => one.name === person.motherName) ? (
        <td>
          <PersonLink
            person={person}
            handleSlugUser={handleSlugUser}
            people={people}
            isParent="mother"
            allParams={allParams}
          />
        </td>
      ) : (
        <td>{person.motherName}</td>
      )
    );
  } else {
    motherCell = (
      <td>-</td>
    );
  }

  let fatherCell;

  if (person.fatherName !== null) {
    fatherCell = (
      people.some(one => one.name === person.fatherName) ? (
        <td>
          <PersonLink
            person={person}
            handleSlugUser={handleSlugUser}
            people={people}
            isParent="father"
            allParams={allParams}
          />
        </td>
      ) : (
        <td>{person.fatherName}</td>
      )
    );
  } else {
    fatherCell = (
      <td>-</td>
    );
  }

  const ActivePerson = (activePerson: Person) => cn(
    { 'has-background-warning': activePerson.slug === slugUser },
  );

  return (
    <tr
      data-cy="person"
      className={ActivePerson(person)}
    >
      <td>
        <PersonLink
          person={person}
          handleSlugUser={handleSlugUser}
          people={people}
          isParent="no"
          allParams={allParams}
        />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {motherCell}
      {fatherCell}
    </tr>
  );
};
