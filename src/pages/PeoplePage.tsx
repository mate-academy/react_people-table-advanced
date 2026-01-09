import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import PeopleTable from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';

interface PeoplePageProps {
  selectedPerson: Person | null;
  setSelectedPerson: (person: Person | null) => void;
  slug?: string | null;
}

const PeoplePage: React.FC<PeoplePageProps> = ({
  selectedPerson,
  setSelectedPerson,
}) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);

        if (slug) {
          const person = data.find(p => p.slug === slug) || null;

          setSelectedPerson(person);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug, setSelectedPerson]);

  const sex = searchParams.get('sex');

  const filteredPeople = useMemo(() => {
    let result = [...people];

    if (query) {
      const q = query.toLowerCase();

      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.motherName?.toLowerCase().includes(q) ||
          p.fatherName?.toLowerCase().includes(q),
      );
    }

    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    if (centuries.length) {
      result = result.filter(p => {
        if (!p.born) {
          return false;
        }

        const century = Math.floor((p.born - 1) / 100) + 1;

        return centuries.includes(String(century));
      });
    }

    return result;
  }, [people, query, sex, centuries]);

  const visiblePeople = useMemo(() => {
    if (!sort) {
      return filteredPeople;
    }

    const sorted = [...filteredPeople].sort((a, b) => {
      const aVal = a[sort as keyof Person] ?? '';
      const bVal = b[sort as keyof Person] ?? '';

      if (typeof aVal === 'string') {
        return aVal.localeCompare(String(bVal));
      }

      return Number(aVal) - Number(bVal);
    });

    return order === 'desc' ? sorted.reverse() : sorted;
  }, [filteredPeople, sort, order]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <div>
      <h1 className="title" data-cy="title">
        People Page
      </h1>

      <div className="columns">
        <div className="column">
          <PeopleTable
            people={visiblePeople}
            selectedPerson={selectedPerson}
            setSelectedPerson={setSelectedPerson}
          />
        </div>

        <div className="column is-one-third">
          <PeopleFilters />
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
