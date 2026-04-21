import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';

type SortField = 'name' | 'sex' | 'born' | 'died';

const getFilteredPeople = (people: Person[], searchParams: URLSearchParams) => {
  const query = searchParams.get('query')?.trim().toLowerCase() || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');

  const preparedPeople = [...people]
    .filter(person => {
      if (!query) {
        return true;
      }

      return (
        person.name.toLowerCase().includes(query) ||
        (person.motherName || '').toLowerCase().includes(query) ||
        (person.fatherName || '').toLowerCase().includes(query)
      );
    })
    .filter(person => {
      if (!sex) {
        return true;
      }

      return person.sex === sex;
    })
    .filter(person => {
      if (!centuries.length) {
        return true;
      }

      const century = Math.ceil(person.born / 100);

      return centuries.includes(String(century));
    });

  if (!sort) {
    return preparedPeople;
  }

  preparedPeople.sort((person1, person2) => {
    switch (sort) {
      case 'name':
        return person1.name.localeCompare(person2.name);

      case 'sex':
        return person1.sex.localeCompare(person2.sex);

      case 'born':
        return person1.born - person2.born;

      case 'died':
        return person1.died - person2.died;

      default:
        return 0;
    }
  });

  if (order === 'desc') {
    preparedPeople.reverse();
  }

  return preparedPeople;
};

export const PeoplePage = () => {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(error => {
        setErrorMsg(error.message);
        setLoading(false);
      });
  }, []);

  const filteredPeople = useMemo(() => {
    return getFilteredPeople(people, searchParams);
  }, [people, searchParams]);

  if (loading) {
    return <Loader />;
  }

  if (errorMsg) {
    return <p data-cy="peopleLoadingError">{errorMsg}</p>;
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              <PeopleTable people={people} filteredPeople={filteredPeople} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
