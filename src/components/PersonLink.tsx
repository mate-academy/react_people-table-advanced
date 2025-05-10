import { Link } from 'react-router-dom';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person;
}

const isFimale = (sex: string | undefined) =>
  sex === 'f' ? 'has-text-danger' : '';

export const PersonLink = ({
  person: { name, slug, sex },
}: PersonLinkProps) => (
  <Link to={`../${slug}`} className={isFimale(sex)}>
    {name}
  </Link>
);
