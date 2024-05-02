import { useParams } from 'react-router-dom';
import { PersonType } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import classNames from 'classnames';

const NO_PARENTS = '-';

type Props = {
  person: PersonType;
};
export const Person: React.FC<Props> = ({ person }) => {
  const { sex, born, died, slug, motherName, fatherName, mother, father } =
    person;
  const { personSlug } = useParams();

  return (
    <tr
      key={slug}
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === personSlug })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? <PersonLink person={mother} /> : motherName || NO_PARENTS}
      </td>
      <td>
        {father ? <PersonLink person={father} /> : fatherName || NO_PARENTS}
      </td>
    </tr>
  );
};
