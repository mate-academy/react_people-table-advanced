import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';
import { PeopleContext } from '../../contexts/PeopleContext';
import { FindPersonByName } from '../../utils/findPersonByName';
import { useMemo } from 'react';

type Props = {
  person: Person;
  highlighted?: boolean;
};

export const PersonRow = ({ person, highlighted = false }: Props) => {
  const { people } = PeopleContext.useState();

  const hasKnownMother = Boolean(person.motherName);
  const motherInDataBase = useMemo(() => {
    return hasKnownMother
      ? FindPersonByName(people.value, person.motherName as string)
      : null;
  }, [hasKnownMother, people.value, person.motherName]);

  const hasKnownFather = Boolean(person.fatherName);
  const fatherInDataBase = useMemo(() => {
    return hasKnownFather
      ? FindPersonByName(people.value, person.fatherName as string)
      : null;
  }, [hasKnownFather, people.value, person.fatherName]);

  return (
    <tr
      className={classNames({ 'has-background-warning': highlighted })}
      data-cy="person"
    >
      <td>
        <PersonLink
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
          person={person}
        />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {hasKnownMother ? (
          motherInDataBase ? (
            <PersonLink className="has-text-danger" person={motherInDataBase} />
          ) : (
            `${person.motherName}`
          )
        ) : (
          '-'
        )}
      </td>

      <td>
        {hasKnownFather ? (
          fatherInDataBase ? (
            <PersonLink person={fatherInDataBase} />
          ) : (
            `${person.fatherName}`
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
