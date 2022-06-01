import classNames from 'classnames';
import React from 'react';
import { HumanWithParents } from '../../types/Human';
import { PersonName } from '../PersonName';

interface Props {
  human: HumanWithParents;
  slug: string | undefined;
}

export const PersonRow: React.FC<Props> = React.memo(({
  human,
  slug,
}) => {
  const {
    sex, born, died, mother, father, motherName, fatherName,
  } = human;

  return (
    <tr
      className={classNames(
        { 'table-active': slug === human.slug },
      )}
    >
      <td className="PeopleTable__cell">
        <PersonName person={human} />
      </td>
      <td className="PeopleTable__cell">{sex}</td>
      <td className="PeopleTable__cell">{born}</td>
      <td className="PeopleTable__cell">{died}</td>
      <td className="PeopleTable__cell">
        <PersonName person={mother} parentName={motherName} />
      </td>
      <td className="PeopleTable__cell">
        <PersonName person={father} parentName={fatherName} />
      </td>
    </tr>
  );
});
