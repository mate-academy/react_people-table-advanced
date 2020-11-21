import React from 'react';
import { IPerson } from '../../Interfaces/Interfaces';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import PersonName from './PersonName';

const PersonRow: React.FC<{ person: IPerson }> = ({ person }) => {
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
        />
      </td>
      <td>
        <PersonName
          person={person}
          name={person.father}
          paramsName={paramsName}
        />
      </td>
    </tr>
  );
};

export default PersonRow;
