import React from 'react';
import { PersonRowProps } from './typesDefinitions'
import { PersonName } from './PersonName';

export const PersonRow: React.FC<PersonRowProps> = (
  { person, people, slug }) => {
  const { sex, born, died, fatherName, motherName, slug: personSlug } = person;

  const findParentInTable = (parentName: string) => {
    const parent = people.find(person => person.name === parentName);
    return parent;
  };

  return (
    <tr className={slug === personSlug ? 'selected' : ''}>
      <td className={'male'}>
        <PersonName
          person={person}
        />
      </td>
      <td>{sex === 'm' ? 'male' : 'female'}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {findParentInTable(motherName)
          ? <PersonName
            person={findParentInTable(motherName)}
          />
          : <> {motherName} </>
        }
      </td>
      <td>
        {findParentInTable(fatherName)
          ? <PersonName
            person={findParentInTable(fatherName)}
          />
          : <> {fatherName} </>
        }
      </td>
    </tr >
  );
};
