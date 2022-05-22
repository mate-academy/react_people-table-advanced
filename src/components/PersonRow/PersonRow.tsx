import classNames from 'classnames';
import React from 'react';
import PersonName from '../PersonName/PersonName';
import './PersonRow.scss';

type Props = {
  person: Person,
  slug: string,
  index: number,
};

const PersonRow: React.FC<Props> = ({ person, slug, index }) => {
  const getPersonParentInfo
    = (parentName: string, parentType: 'mother' | 'father') => {
      if (!parentName) {
        return 'Information is absent';
      }

      switch (parentType) {
        case 'mother':
          if (!person.mother) {
            return `${parentName} (Detailed info is absent)`;
          }

          return (
            <PersonName person={person.mother}>
              {`${parentName} | ${person.mother.born} - ${person.mother.died}`}
            </PersonName>
          );
        default:
          if (!person.father) {
            return `${parentName} (Detailed info is absent)`;
          }

          return (
            <PersonName person={person.father}>
              {`${parentName} | ${person.father.born} - ${person.father.died}`}
            </PersonName>
          );
      }
    };

  const rowStylesClass = classNames({
    Person: true,
    Selected: person.slug === slug,
  });

  return (
    <>
      <tr
        className={rowStylesClass}
      >
        <td>
          <PersonName person={person}>
            {`${index + 1}. ${person.name}`}
          </PersonName>
        </td>
        <td>
          {
            person.sex === 'm'
              ? 'male'
              : 'female'
          }
        </td>
        <td>
          {person.born}
        </td>
        <td>
          {person.died}
        </td>
        <td className="ParentName">
          {getPersonParentInfo(person.motherName, 'mother')}
        </td>
        <td className="ParentName">
          {getPersonParentInfo(person.fatherName, 'father')}
        </td>
      </tr>
    </>
  );
};

export default PersonRow;
