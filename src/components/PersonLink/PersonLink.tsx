import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';

interface PersonLinkProps {
  person: Person;
}

const isFemale = (sex: string | undefined) =>
  sex === 'f' ? 'has-text-danger' : '';

export const PersonLink = ({
  person: { name, slug, sex },
}: PersonLinkProps) => {
  const [search] = useSearchParams();

  return (
    <Link
      to={`/people/${slug}${search.toString() ? `?${search.toString()}` : ''}`}
      className={isFemale(sex)}
    >
      {name}
    </Link>
  );
};
