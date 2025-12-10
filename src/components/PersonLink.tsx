import { Link } from 'react-router-dom';

export interface LinkPerson {
  name: string;
  sex: string;
  born?: number;
}

interface PersonLinkProps {
  person: LinkPerson;
}

const generateSlug = (name: string, born?: number): string => {
  const safeName = name.replace(/\s+/g, '-').toLowerCase();

  if (born) {
    return `${safeName}-${born}`;
  }

  return safeName;
};

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const nameToUse = person.name;
  const slug = generateSlug(nameToUse, person.born);

  const absolutePath = `/people/${slug}`;

  const className = person.sex === 'f' ? 'has-text-danger' : undefined;

  return (
    <Link to={absolutePath} className={className}>
      {person.name}
    </Link>
  );
};
