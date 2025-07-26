import { Link } from 'react-router-dom';
import type { Person } from '../types/Person';

export const PersonLink = ({
  name,
  allPeople,
}: {
  name: string;
  allPeople: Person[];
}) => {
  if (!name) {
    return <span>-</span>;
  }

  // Procura se existe uma pessoa com esse nome
  const foundPerson = allPeople.find(p => p.name === name);

  // Se não encontrou a pessoa, retorna apenas o texto
  if (!foundPerson) {
    return <span>{name}</span>;
  }

  // Se encontrou, retorna o link com replace para evitar re-renderização
  return (
    <Link
      to={`/people/${foundPerson.slug}`}
      replace
      className={foundPerson.sex === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </Link>
  );
};
