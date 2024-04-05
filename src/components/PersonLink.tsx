import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person?: Person;
  name?: string | null;
  people?: Person[];
};

export const PersonLink = ({ person, name, people }: Props) => {
  const slug = person?.slug;
  const linkName = person?.name || name || '-';
  const parentsName = people ? people.find(p => p.name === linkName) : null;
  const isWoman = person?.sex === 'f' || parentsName?.sex === 'f';
  const [searchParams] = useSearchParams();

  if (slug || parentsName) {
    return (
      <td>
        <Link
          to={{
            pathname: `/people/${slug || parentsName?.slug}`,
            search: searchParams.toString(),
          }}
          className={classNames({
            'has-text-danger': isWoman,
          })}
        >
          {linkName}
        </Link>
      </td>
    );
  }

  return <td>{linkName}</td>;
};
