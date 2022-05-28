import classNames from 'classnames';
import React from 'react';
import { HumanWithParents } from '../../types/Human';
import { PersonName } from '../PersonName';

interface Props {
  human: HumanWithParents;
  number: number;
  slug: string | undefined;
}

export const PersonRow: React.FC<Props> = React.memo(({
  human,
  number,
  slug,
}) => {
  const {
    sex, born, died, mother, father,
  } = human;

  return (
    <tr
      className={classNames(
        { 'table-active': slug === human.slug },
      )}
    >
      <th className="PeopleTable__cell">{number}</th>
      <td className="PeopleTable__cell">
        <PersonName person={human} />
      </td>
      <td className="PeopleTable__cell">{sex}</td>
      <td className="PeopleTable__cell">{born}</td>
      <td className="PeopleTable__cell">{died}</td>
      <td className="PeopleTable__cell">
        <PersonName person={mother} />
      </td>
      <td className="PeopleTable__cell">
        <PersonName person={father} />
      </td>
    </tr>
  );
});
