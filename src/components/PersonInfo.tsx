import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  search: URLSearchParams;
};

export const PersonInfo: React.FC<Props> = ({ person, search }) => {
  const { name, slug, sex } = person;
  const SEX_FEMALE = 'f';

  return (
    <Link
      to={{
        pathname: slug,
        search: search.toString(),
      }}
      className={classNames({ 'has-text-danger': sex === SEX_FEMALE })}
    >
      {name}
    </Link>
  );
};
