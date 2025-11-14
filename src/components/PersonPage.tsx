import { useOutletContext, useParams } from 'react-router-dom';
import { Person } from '../types';

type ContextType = {
  people: Person[];
  peopleByName: Map<string, Person>;
};

export const PersonPage = () => {
  const { slug } = useParams();
  const { people } = useOutletContext<ContextType>();

  const person = people.find(p => p.slug === slug);

  if (!person) {
    return <h2 className="title">Person not found</h2>;
  }

  return (
    <>
      <h1 className="title">{person.name}</h1>
      <p>Born: {person.born}</p>
      <p>Died: {person.died}</p>
      <p>Sex: {person.sex}</p>
    </>
  );
};
