import { useCallback, useMemo } from 'react';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  personToRender: Person;
  slug?: string;
  people: Person[];
};

export const PeopleRow: React.FC<Props> = ({
  personToRender,
  slug,
  people,
}) => {
  const findParentInTable = useCallback(
    (parentName: string | null) => {
      return people.find(person => person.name === parentName);
    },
    [people],
  );
  const mother = useMemo(() => {
    return findParentInTable(personToRender.motherName);
  }, [findParentInTable, personToRender.motherName]);
  const father = useMemo(() => {
    return findParentInTable(personToRender.fatherName);
  }, [findParentInTable, personToRender.fatherName]);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === personToRender.slug,
      })}
    >
      <PersonLink person={personToRender} />

      <td>{personToRender.sex}</td>
      <td>{personToRender.born}</td>
      <td>{personToRender.died}</td>
      {mother ? (
        <PersonLink person={mother} />
      ) : (
        <td>{personToRender.motherName || '-'}</td>
      )}

      {father ? (
        <PersonLink person={father} />
      ) : (
        <td>{personToRender.fatherName || '-'}</td>
      )}
    </tr>
  );
};
