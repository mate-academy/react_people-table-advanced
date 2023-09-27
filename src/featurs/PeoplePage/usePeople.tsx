import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getPeople();

        setPeople(data);
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getParentSlug = (parentName: string | null) => {
    const parent = people.find(p => p.name === parentName);

    if (parent) {
      return (
        <Link
          to={`/people/${parent.slug}`}
          className={parent.sex === 'f' ? 'has-text-danger' : ''}

        >
          {parent.name}
        </Link>
      );
    }

    return parentName || '-';
  };

  return {
    people, isLoading, error, getParentSlug,
  };
};
