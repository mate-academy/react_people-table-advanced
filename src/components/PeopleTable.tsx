import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  people: Person[];
  setPeople: (people: Person[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

type SortState = {
  field: string | null;
  order: 'asc' | 'desc' | null;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  setPeople,
  loading,
  setLoading,
}) => {
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortState, setSortState] = useState<SortState>({
    field: null,
    order: null,
  });

  const queryParam = searchParams.get('query')?.toLowerCase() || '';
  const sexParam = searchParams.get('sex');
  const centuryParam = searchParams.getAll('centuries');

  const filterPeopleByQuery = (
    peopleList: Person[],
    query: string,
  ): Person[] => {
    const lowerCaseQuery = query.toLowerCase().trim();

    return peopleList.filter(person => {
      const nameMatch = person.name.toLowerCase().includes(lowerCaseQuery);
      const motherMatch =
        person.motherName?.toLowerCase().includes(lowerCaseQuery) || false;
      const fatherMatch =
        person.fatherName?.toLowerCase().includes(lowerCaseQuery) || false;

      return nameMatch || motherMatch || fatherMatch;
    });
  };

  const filterPeopleBySex = (
    peopleList: Person[],
    sex: string | null,
  ): Person[] => {
    if (!sex) {
      return peopleList;
    }

    return peopleList.filter(person => person.sex === sex);
  };

  const filterPeopleByCentury = (
    peopleList: Person[],
    centuries: string[],
  ): Person[] => {
    if (centuries.length === 0) {
      return peopleList;
    }

    return peopleList.filter(person => {
      const birthYear = person.born;

      const personCentury = birthYear
        ? Math.floor((birthYear - 1) / 100) + 1
        : null;

      return personCentury && centuries.includes(String(personCentury));
    });
  };

  const filterPeople = (
    peopleList: Person[],
    query: string,
    sex: string | null,
    centuries: string[],
  ): Person[] => {
    let filteredPeople = filterPeopleByQuery(peopleList, query);

    filteredPeople = filterPeopleBySex(filteredPeople, sex);
    filteredPeople = filterPeopleByCentury(filteredPeople, centuries);

    return filteredPeople;
  };

  const handleSort = (field: string) => {
    let newOrder: SortState['order'] = 'asc';

    if (sortState.field === field) {
      if (sortState.order === 'asc') {
        newOrder = 'desc';
      } else if (sortState.order === 'desc') {
        newOrder = null;
      }
    }

    setSortState({ field: newOrder ? field : null, order: newOrder });

    const params = new URLSearchParams(searchParams);

    if (newOrder) {
      params.set('sort', field);

      if (newOrder === 'desc') {
        params.set('order', newOrder);
      }
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const sortPeople = (peopleList: Person[]): Person[] => {
    if (!sortState.field || !sortState.order) {
      return peopleList;
    }

    const sortedPeople = [...peopleList].sort((a, b) => {
      const aValue = a[sortState.field as keyof Person]!;
      const bValue = b[sortState.field as keyof Person]!;

      if (aValue < bValue) {
        return sortState.order === 'asc' ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortState.order === 'asc' ? 1 : -1;
      }

      return 0;
    });

    return sortedPeople;
  };

  const renderSortIcon = (field: string) => {
    if (sortState.field !== field) {
      return <i className="fas fa-sort"></i>; // Іконка за замовчуванням
    }

    if (sortState.order === 'asc') {
      return <i className="fas fa-sort-up"></i>; // Стрілка вгору
    }

    if (sortState.order === 'desc') {
      return <i className="fas fa-sort-down"></i>; // Стрілка вниз
    }

    return <i className="fas fa-sort"></i>; // Іконка за замовчуванням
  };

  useEffect(() => {
    getPeople()
      .then(data => {
        let filteredPeople = filterPeople(
          data,
          queryParam,
          sexParam,
          centuryParam, // Без split, бо це вже масив
        );

        filteredPeople = sortPeople(filteredPeople);

        setPeople(filteredPeople);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [searchParams]);

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>
            <span>Name {renderSortIcon('name')}</span>
          </th>
          <th onClick={() => handleSort('sex')}>
            <span>Sex {renderSortIcon('sex')}</span>
          </th>
          <th onClick={() => handleSort('born')}>
            <span>Born {renderSortIcon('born')}</span>
          </th>
          <th onClick={() => handleSort('died')}>
            <span>Died {renderSortIcon('died')}</span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink person={person} key={person.slug} people={people} />
        ))}
      </tbody>
    </table>
  );
};
