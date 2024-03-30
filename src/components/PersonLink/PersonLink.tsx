import { Link, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';
import { ParentLink } from '../ParentLink';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({
  person: {
    slug,
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    father,
    mother,
  },
}) => {
  const { slugId } = useParams();
  const { search } = useLocation();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === slugId,
      })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': sex === 'f' })}
          to={{ pathname: `../${slug}`, search }}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <ParentLink parent={mother} name={motherName} />
      <ParentLink parent={father} name={fatherName} />
    </tr>
  );
};
