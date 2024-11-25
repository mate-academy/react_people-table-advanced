import cn from 'classnames';
import { Link } from 'react-router-dom';

import { Person } from '../../types/Person';

type Props = { person: Person };

export const PersonLink: React.FC<Props> = ({
  person: { slug, name, sex },
}) => {
  return (
    <Link
      to={'/people/' + slug}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
