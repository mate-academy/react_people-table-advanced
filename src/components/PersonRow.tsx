import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonRow: React.FC<Props> = ({ person, people }) => {
  const { name, sex, born, died, motherName, fatherName, slug } = person;
  const { personSlug } = useParams();

  const selectedPerson = slug === personSlug;

  const mother: Person | undefined = people.find(
    item => item.name === motherName,
  );

  const father: Person | undefined = people.find(
    item => item.name === fatherName,
  );

  const motherDisplayName = motherName || '-';
  const fatherDisplayName = fatherName || '-';

  return (
    <>
      <tr
        data-cy="person"
        className={classNames({
          'has-background-warning': selectedPerson,
        })}
      >
        <td>
          <PersonLink name={name} slug={slug} sex={sex} />
        </td>
        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>
          {mother ? (
            <PersonLink
              name={mother.name}
              slug={mother.slug}
              sex={mother.sex}
            />
          ) : (
            motherDisplayName
          )}
        </td>
        <td>
          {father ? (
            <PersonLink
              name={father.name}
              slug={father.slug}
              sex={father.sex}
            />
          ) : (
            fatherDisplayName
          )}
        </td>
      </tr>
    </>
  );
};
