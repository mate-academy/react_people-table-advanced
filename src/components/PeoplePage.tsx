import { useEffect, useMemo, useState } from 'react';
import {
  useNavigate,
  useSearchParams,
  useLocation,
  useParams,
} from 'react-router-dom';

import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { '*': slug } = useParams<{ '*': string }>();

  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const selectedPerson = useMemo(() => {
    if (!slug) {
      return null;
    }

    return people.find(p => p.slug === slug) || null;
  }, [people, slug]);

  const visiblePeople = useMemo(() => {
    let result = [...people];

    if (query) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    if (centuries.length) {
      result = result.filter(p =>
        centuries.includes(String(Math.ceil(p.born / 100))),
      );
    }

    if (sort) {
      result.sort((a, b) => {
        let res = 0;

        switch (sort) {
          case 'name':
            res = a.name.localeCompare(b.name);
            break;
          case 'sex':
            res = a.sex.localeCompare(b.sex);
            break;
          case 'born':
            res = a.born - b.born;
            break;
          case 'died':
            res = a.died - b.died;
            break;
        }

        return order === 'desc' ? -res : res;
      });
    }

    return result;
  }, [people, query, sex, centuries, sort, order]);

  const handleSelect = (person: Person) => {
    navigate({
      pathname: `/people/${person.slug}`,
      search: location.search,
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p data-cy="peopleLoadingError">Error</p>;
  }

  if (!people.length) {
    return <p data-cy="noPeopleMessage">There are no people</p>;
  }

  return (
    <div>
      <h1 className="title">People Page</h1>

      <PeopleFilters />

      <PeopleTable
        people={visiblePeople}
        selectedPerson={selectedPerson}
        onSelect={handleSelect}
      />
    </div>
  );
};
