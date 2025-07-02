import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const PersonDetailsPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(people => {
        const found = people.find(p => p.slug === slug) || null;

        setPerson(found);
      })
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (isLoading) {
    return <p>Loading person details...</p>;
  }

  if (!person) {
    return <p className="has-text-danger">Person not found</p>;
  }

  return (
    <div className="content">
      <h1 className="title">{person.name}</h1>

      <ul>
        <li>
          <strong>Sex:</strong> {person.sex}
        </li>
        <li>
          <strong>Born:</strong> {person.born}
        </li>
        <li>
          <strong>Died:</strong> {person.died}
        </li>
        <li>
          <strong>Mother:</strong> {person.motherName || '-'}
        </li>
        <li>
          <strong>Father:</strong> {person.fatherName || '-'}
        </li>
      </ul>

      <button
        className="button mt-4"
        onClick={() => {
          navigate({
            pathname: '/people',
            search: searchParams.toString(),
          });
        }}
      >
        ← Back to table
      </button>
    </div>
  );
};
