import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { selectPersonWith } from '../utils/selectPersonWith';
import { Sex } from '../types/Sex';

type Props = {
  person: Person;
  search: string;
};

export const PersonLink: React.FC<Props> = ({ person, search }) => {
  const { name, slug, sex } = person;

  return (
    <Link
      className={cn({ 'has-text-danger': sex === Sex.Female })}
      to={selectPersonWith(`/people/${slug}`, search)}
    >
      {name}
    </Link>
  );
};
