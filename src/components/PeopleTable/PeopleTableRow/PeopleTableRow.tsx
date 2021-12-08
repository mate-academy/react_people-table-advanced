import { FC } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonFull } from '../../../services/types';
import { PersonName } from '../../PersonName';
import './PeopleTableRow.scss';

interface Props {
  person: PersonFull;
}

export const PeopleTableRow: FC<Props> = ({ person }) => {
  const { personSlug } = useParams<{ personSlug: string }>();

  return (
    <tr className={cn({ selected: personSlug === person.slug })}>
      <td>
        <PersonName person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.father
          ? <PersonName person={person.father} />
          : <p>{person.fatherName}</p>}
      </td>

      <td>
        {person.mother
          ? <PersonName person={person.mother} />
          : <p>{person.motherName}</p>}
      </td>
    </tr>
  );
};
