import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredPeople = useMemo(() => {
    let result = [...people];

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (query) {
      const normalizedQuery = query.toLowerCase().trim();

      result = result.filter(person => {
        const { name, motherName, fatherName } = person;

        return (
          name.toLowerCase().includes(normalizedQuery) ||
          motherName?.toLowerCase().includes(normalizedQuery) ||
          fatherName?.toLowerCase().includes(normalizedQuery)
        );
      });
    }

    if (centuries.length > 0) {
      result = result.filter(person => {
        const century = Math.ceil(person.born / 100);

        return centuries.includes(century.toString());
      });
    }

    return result;
  }, [people, sex, query, centuries]);

  const sortedPeople = useMemo(() => {
    const copy = [...filteredPeople];

    if (sort === 'name') {
      copy.sort((a, b) => {
        return order === 'desc'
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);
      });
    }

    if (sort === 'sex') {
      copy.sort((a, b) => {
        return order === 'desc'
          ? b.sex.localeCompare(a.sex)
          : a.sex.localeCompare(b.sex);
      });
    }

    if (sort === 'born') {
      copy.sort((a, b) => {
        return order === 'desc' ? b.born - a.born : a.born - b.born;
      });
    }

    if (sort === 'died') {
      copy.sort((a, b) => {
        return order === 'desc' ? b.died - a.died : a.died - b.died;
      });
    }

    return copy;
  }, [filteredPeople, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <PeopleTable
              people={sortedPeople}
              allPeople={people}
              isLoading={loading}
              errorMessage={errorMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
};
