import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};

const FEMALE_SEX_IDENTIFIER = 'f';

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  const { name, sex, slug } = person;
  const isFemale = sex === FEMALE_SEX_IDENTIFIER;

  return (
    <Link
      className={classNames({
        'has-text-danger': isFemale,
      })}
      to={{
        pathname: `/people/${slug}`,
        search: searchParams.toString(),
      }}
    >
      {name}
    </Link>
  );
};
