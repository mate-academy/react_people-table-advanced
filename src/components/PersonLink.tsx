import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const { slug, sex, name } = person;

  return (
    <>
      {slug ? (
        <Link
          to={{
            pathname: `../${slug}`,
            search: searchParams.toString(),
          }}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      ) : (
        { name }
      )}
    </>
  );
};
