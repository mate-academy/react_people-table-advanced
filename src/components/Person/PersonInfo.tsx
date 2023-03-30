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
  person,
  personSlug,
  parents: { father, mother },
}) => (
  <tr
    data-cy="person"
    className={classNames(
      { 'has-background-warning': personSlug === person.slug },
    )}
  >
    <td>
      <PersonLink
        person={person}
      />
    </td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>
      {mother
        ? <PersonLink person={mother} />
        : person.motherName || '-'}
    </td>
    <td>
      {father
        ? <PersonLink person={father} />
        : person.fatherName || '-'}
    </td>
  </tr>
);

export default PersonInfo;
