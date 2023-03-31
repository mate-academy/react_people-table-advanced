import classNames from 'classnames';

import { Person } from '../../types';

import PersonLink from './PersonLink';

type Props = {
  person: Person;
  personSlug: string;
  parents: {
    father: Person | null,
    mother: Person | null
  },
};

const PersonInfo: React.FC<Props> = ({
  person: {
    slug,
    sex,
    born,
    died,
    fatherName,
    motherName,
  },
  person,
  personSlug,
  parents: { father, mother },
}) => (
  <tr
    data-cy="person"
    className={classNames(
      { 'has-background-warning': personSlug === slug },
    )}
  >
    <td>
      <PersonLink
        person={person}
      />
    </td>
    <td>{sex}</td>
    <td>{born}</td>
    <td>{died}</td>
    <td>
      {mother
        ? <PersonLink person={mother} />
        : motherName || '-'}
    </td>
    <td>
      {father
        ? <PersonLink person={father} />
        : fatherName || '-'}
    </td>
  </tr>
);

export default PersonInfo;
