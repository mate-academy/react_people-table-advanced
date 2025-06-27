import React, { useContext } from 'react';
import cn from 'classnames';
import { Person as PersonType } from '../types';
import { PersonLink } from './PersonLink';
import { PeopleContext } from '../contexts';

interface PersonProps {
  person: PersonType;
  selectedPersonSlug: string | null;
}

export const Person: React.FC<PersonProps> = ({
  person,
  selectedPersonSlug,
}) => {
  const context = useContext(PeopleContext);

  if (context === undefined) {
    throw new Error('Person component must be used within a PeopleProvider');
  }

  const peopleLookup = context.peopleLookup;

  const { sex, born, died, motherName, fatherName, slug } = person;

  const motherPersonInLookup = motherName
    ? peopleLookup.get(motherName!)
    : undefined;

  const fatherPersonInLookup = fatherName
    ? peopleLookup.get(fatherName!)
    : undefined;

  const isSelected = selectedPersonSlug === slug;

  const emptyValue = '-';

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {(() => {
          if (!motherName) {
            return emptyValue;
          }

          if (motherPersonInLookup) {
            return <PersonLink person={motherPersonInLookup} />;
          }

          return <span>{motherName}</span>;
        })()}
      </td>

      <td>
        {(() => {
          if (!fatherName) {
            return emptyValue;
          }

          if (fatherPersonInLookup) {
            return <PersonLink person={fatherPersonInLookup} />;
          }

          return <span>{fatherName}</span>;
        })()}
      </td>
    </tr>
  );
};
