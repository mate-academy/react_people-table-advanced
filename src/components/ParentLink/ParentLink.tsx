import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';

type Props = {
  parent: Person | undefined;
  name: string | null;
};

export const ParentLink: React.FC<Props> = ({ parent, name }) => {
  const { search } = useLocation();

  return (
    <td>
      {parent ? (
        <Link
          className={cn({ 'has-text-danger': parent.sex === 'f' })}
          to={{
            pathname: `../${parent.slug}`,
            search,
          }}
        >
          {name}
        </Link>
      ) : (
        name ?? '-'
      )}
    </td>
  );
};
