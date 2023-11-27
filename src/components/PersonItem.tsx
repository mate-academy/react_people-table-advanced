import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { NO_PARENT } from '../utils/variables';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person,
};

export const PersonItem = ({
  person,
}: Props) => {
  const {
    slug,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  const { slug: slugFromParams } = useParams();

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({
        'has-background-warning': slugFromParams === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? <PersonLink person={mother} />
          : motherName ?? NO_PARENT}
      </td>
      <td>
        {father
          ? <PersonLink person={father} />
          : fatherName ?? NO_PARENT}
      </td>
    </tr>
  );
};
