import classNames from 'classnames';
import { FC } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  person: Person;
  selectedSlug: string;
};

export const PersonDetails:FC<Props> = ({ people, person, selectedSlug }) => {
  const {
    sex, born, died, motherName, fatherName, slug,
  } = person;

  const motherFound = people.find(item => item.name === motherName);
  const motherCell = motherName || '-';

  const fatherFound = people.find(item => item.name === fatherName);
  const fatherCell = fatherName || '-';

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': selectedSlug === slug },
      )}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherFound
          ? <PersonLink person={motherFound} />
          : motherCell}
      </td>
      <td>
        {fatherFound
          ? <PersonLink person={fatherFound} />
          : fatherCell}
      </td>
    </tr>
  );
};
