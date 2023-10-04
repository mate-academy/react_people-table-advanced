import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person, Sex } from '../../types';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    slug,
    sex,
    name,
  } = person;
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `../${slug}`,
        search: searchParams.toString(),
      }}
      className={cn({
        'has-text-danger': sex === Sex.Female,
      })}
    >
      {name}
    </Link>
  );
};
