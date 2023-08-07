import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({
  person: { slug, sex, name },
}) => {
  const [searchParams] = useSearchParams();

  return (
    <td>
      <Link
        to={{
          pathname: `/people/${slug}`,
          search: searchParams.toString(),
        }}
        className={classNames({
          'has-text-danger': sex === 'f',
        })}
      >
        {name}
      </Link>
    </td>
  );
};
