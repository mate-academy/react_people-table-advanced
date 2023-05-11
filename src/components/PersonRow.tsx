import { FC } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  motherInList: Person | null;
  fatherInList: Person | null
};

export const PersonRow: FC<Props> = (({
  person,
  motherInList,
  fatherInList,
}) => {
  const { slug: currentSlug } = useParams();
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  const checkedMotherName = motherName || '-';
  const checkedFatherName = fatherName || '-';

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === currentSlug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {
          motherInList
            ? (<PersonLink person={motherInList} />)
            : (checkedMotherName)
        }
      </td>
      <td>
        {
          fatherInList
            ? (<PersonLink person={fatherInList} />)
            : (checkedFatherName)
        }
      </td>
    </tr>
  );
});
