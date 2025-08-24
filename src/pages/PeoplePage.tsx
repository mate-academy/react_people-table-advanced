import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useParams, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort'); // 'name' | 'sex' | 'born' | 'died'
  const order = searchParams.get('order'); // 'desc' | null (asc by default)

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const query = (searchParams.get('query') || '').toLowerCase();
  const sex = searchParams.get('sex'); // 'm' | 'f' | null
  const centuries = searchParams.getAll('centuries');

  const visiblePeople = people.filter(p => {
    // name filter
    const normalized = query.toLowerCase();
    const matchesQuery =
      !query ||
      p.name.toLowerCase().includes(normalized) ||
      p.motherName?.toLowerCase().includes(normalized) ||
      p.fatherName?.toLowerCase().includes(normalized);

    // sex filter
    const matchesSex = !sex || p.sex === sex;

    // century filter (народжений у цьому столітті)
    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(String(Math.ceil(p.born / 100)));

    return matchesQuery && matchesSex && matchesCentury;
  });

  const handleSort = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== field) {
      // нова колонка → встановлюємо asc
      searchParams.set('sort', field);
      searchParams.delete('order'); // asc by default
    } else if (!currentOrder) {
      // було asc → робимо desc
      searchParams.set('order', 'desc');
    } else if (currentOrder === 'desc') {
      // було desc → прибираємо сортування
      searchParams.delete('sort');
      searchParams.delete('order');
    }

    setSearchParams(searchParams);
  };

  const sortedPeople = [...visiblePeople].sort((a, b) => {
    switch (sort) {
      case 'name':
        return order === 'desc'
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);
      case 'sex':
        return order === 'desc'
          ? b.sex.localeCompare(a.sex)
          : a.sex.localeCompare(b.sex);
      case 'born':
        return order === 'desc' ? b.born - a.born : a.born - b.born;
      case 'died':
        return order === 'desc' ? b.died - a.died : a.died - b.died;
      default:
        return 0;
    }
  });

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      {loading && <Loader />}
      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {!loading && !error && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
      {!loading && !error && people.length > 0 && (
        <PeopleTable
          people={sortedPeople}
          selectedSlug={slug}
          onSort={handleSort}
          sort={sort}
          order={order}
        />
      )}
    </div>
  );
};
