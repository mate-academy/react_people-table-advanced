import { useEffect, useMemo, useState } from 'react';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../services/api';
import { Person } from '../types';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { Order } from '../types/OrderFilter';
import { peopleSort } from '../utils/sortHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase().trim();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    async function peoples() {
      try {
        const data = await getPeople();
        const peopleByName: { [key: string]: Person } = {};

        data.forEach(person => (peopleByName[person.name] = person));
        const dataUpdated = data.map(p => {
          return {
            ...p,
            mother: peopleByName[p.motherName || ''],
            father: peopleByName[p.fatherName || ''],
          };
        });

        setPeople(dataUpdated);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    peoples();
  }, []);

  const filteredPeople = useMemo(() => {
    let peopleFiltered = [...people];

    if (query) {
      peopleFiltered = peopleFiltered.filter(
        person =>
          person.name.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query),
      );
    }

    if (sex) {
      peopleFiltered = peopleFiltered.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      peopleFiltered = peopleFiltered.filter(person => {
        return centuries.includes(
          (+person.born.toString().slice(0, 2) + 1).toString(),
        );
      });
    }

    if (sort) {
      const direction = order === Order.desc ? -1 : 1;

      peopleFiltered = peopleSort(peopleFiltered, direction, sort);
    }

    return peopleFiltered;
  }, [people, query, sex, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : !people.length ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            <>
              <PeopleFilters />
              <PeopleTable people={filteredPeople} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
