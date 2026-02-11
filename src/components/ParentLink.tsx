import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { selectPersonWith } from '../utils/selectPersonWith';
import { Sex } from '../types/Sex';

type Props = {
  parent: Person;
  search: string;
};

export const ParentLink: React.FC<Props> = ({ parent, search }) => {
  const { name, slug, sex } = parent;

  return (
    <Link
      to={selectPersonWith(`/people/${slug}`, search)}
      className={cn({ 'has-text-danger': sex === Sex.Female })}
    >
      {name}
    </Link>
  );
};
