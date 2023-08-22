import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person,
  selectedPersonSlug: string,
  setSelectedPersonSlug: (slug: string) => void,
};

export const PersonTableRaw: React.FC<Props> = ({
  person,
  selectedPersonSlug,
  setSelectedPersonSlug,
}) => {
  const {
    slug,
    sex,
    born,
    died,
    fatherName,
    motherName,
    mother = null,
    father = null,
  } = person;

  return (
    <tr
      data-cy="person"
      className={slug === selectedPersonSlug
        ? 'has-background-warning'
        : ''}
    >
      <td>
        <PersonLink
          person={person}
          setSelectedPersonSlug={setSelectedPersonSlug}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <PersonLink
              person={mother}
              setSelectedPersonSlug={setSelectedPersonSlug}
            />
          )
          : motherName || '-'}
      </td>
      <td>
        {father
          ? (
            <PersonLink
              person={father}
              setSelectedPersonSlug={setSelectedPersonSlug}
            />
          )
          : fatherName || '-'}
      </td>
    </tr>
  );
};
