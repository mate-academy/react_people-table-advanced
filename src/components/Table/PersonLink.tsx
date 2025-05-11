import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';

interface PersonLinkProps {
  person: Person;
}

const isFimale = (sex: string | undefined) =>
  sex === 'f' ? 'has-text-danger' : '';

export const PersonLink = ({
  person: { name, slug, sex },
}: PersonLinkProps) => {
  const [search] = useSearchParams();

  return (
    <Link
      to={{ pathname: `../${slug}`, search: search.toString() }}
      className={isFimale(sex)}
    >
      {name}
    </Link>
  );
};
