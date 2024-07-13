import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  person: Person;
  mother: Person | string | null;
  father: Person | string | null;
}

export const TableRow: React.FC<Props> = ({ person, mother, father }) => {
  const { slug: paramsSlug } = useParams<{ slug: string | undefined }>();

  const { sex, slug, born, died } = person;
  const isActiveRow = slug === paramsSlug;

  return (
    <tr
      key={slug}
      data-cy="person"
      className={cn({
        'has-background-warning': isActiveRow,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        <PersonLink person={mother} />
      </td>
      <td>
        <PersonLink person={father} />
      </td>
    </tr>
  );
};
