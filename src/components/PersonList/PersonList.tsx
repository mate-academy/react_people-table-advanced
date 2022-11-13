import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person,
  selectedPerson: string,
};

export const PersonList: React.FC<Props> = ({
  person,
  selectedPerson,
}) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;
  const isSelected = selectedPerson === slug;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <PersonLink
          to={slug}
          name={name}
          sex={sex}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink
            to={mother?.slug}
            name={motherName}
            sex={mother.sex}
          />
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <PersonLink
            to={father?.slug}
            name={fatherName}
            sex={father.sex}
          />
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
