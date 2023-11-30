import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const { name, slug, sex } = person;
  const SEX_TYPE_FEMALE = 'f';

  return (
    <Link
      to={{
        pathname: `../${slug}`,
        search: searchParams.toString(),
      }}
      className={classNames({ 'has-text-danger': sex === SEX_TYPE_FEMALE })}
    >
      {name}
    </Link>
  );
};
