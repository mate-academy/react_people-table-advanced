import React from 'react';
import { HumanWithParents } from '../../types/Human';

interface Props {
  human: HumanWithParents;
  number: number;
}

export const PersonRow: React.FC<Props> = React.memo(({
  human,
  number,
}) => {
  const {
    name, sex, born, died, motherName, fatherName,
  } = human;

  return (
    <tr>
      <th className="PeopleTable__cell">{number}</th>
      <td className="PeopleTable__cell">{name}</td>
      <td className="PeopleTable__cell">{sex}</td>
      <td className="PeopleTable__cell">{born}</td>
      <td className="PeopleTable__cell">{died}</td>
      <td className="PeopleTable__cell">{motherName || 'not found'}</td>
      <td className="PeopleTable__cell">{fatherName || 'not found'}</td>
    </tr>
  );
});
