import { Link, useNavigate } from 'react-router-dom';
import { PersonLinkProps } from '../types';
import { useSearchParamsContext } from '../SearchParamsContext';

export const PersonLink: React.FC<PersonLinkProps> = ({ person, people }) => {
  const navigate = useNavigate();
  const existingPerson = people.find(p => p.name === person);
  const { searchParams } = useSearchParamsContext();

  const handlePersonClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (existingPerson) {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      navigate(`/people/${existingPerson.slug}?${newSearchParams.toString()}`);
    }
  };

  return existingPerson ? (
    <Link
      to={`/people/${existingPerson.slug}`}
      className={existingPerson.sex === 'f' ? 'has-text-danger' : ''}
      onClick={handlePersonClick}
    >
      {person}
    </Link>
  ) : (
    <span>{person || '-'}</span>
  );
};
