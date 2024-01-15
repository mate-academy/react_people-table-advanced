/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../link';

type Props = {
  person: Person;
};

export const PersonItem = ({ person }: Props) => {
  const {
    slug, sex, born, died, mother, motherName, father, fatherName,
  } = person;
  const { slug: path } = useParams();

  return (
    <>
      <tr
        data-cy="person"
        className={slug === path ? 'has-background-warning' : ''}
      >
        <td>
          <PersonLink parrent={person} />
        </td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>
          {mother
            ? (
              <PersonLink parrent={mother} />
            )
            : (
              motherName || '-'
            )}
        </td>
        <td>
          {father
            ? (
              <PersonLink parrent={father} />
            )
            : (
              fatherName || '-'
            )}
        </td>
      </tr>
    </>
  );
};
