import React from 'react';
import { IPerson } from '../../Interfaces/Interfaces';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import PersonName from './PersonName';

const PersonRow: React.FC<{ person: IPerson; people: IPerson[] }> = ({
  person,
  people,
}) => {
  // skip
  const params: { person: string } = useParams();

  const parsParamsName = () => {
    if (params.person) {
      const arrFromName = params.person.split('-');
      const paramsName = arrFromName.slice(0, arrFromName.length - 1).join(' ');

      return paramsName;
    }

    return '';
  };

  const paramsName = parsParamsName();

  return (
    <tr className={cn({ row: paramsName === person.name.toLowerCase() })}>
      <td className="person-name">
        <PersonName
          person={person}
          name={person.name}
          paramsName={paramsName}
          people={people}
        />
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        <PersonName
          person={person}
          name={person.mother}
          paramsName={paramsName}
          people={people}
        />
      </td>
      <td>
        <PersonName
          person={person}
          name={person.father}
          paramsName={paramsName}
          people={people}
        />
      </td>
    </tr>
  );
};

export default PersonRow;
