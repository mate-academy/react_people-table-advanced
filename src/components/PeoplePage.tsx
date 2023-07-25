import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

type SortBy = 'Name' | 'Sex' | 'Born' | 'Died';

const comparePeople = (person1: Person, person2: Person, sortBy: SortBy) => {
  switch (sortBy) {
    case 'Name':
      return person1.name.localeCompare(person2.name);

    case 'Sex':
      return person1.sex.localeCompare(person2.sex);

    case 'Born':
      return person1.born - person2.born;

    case 'Died':
      return person1.died - person2.died;

    default:
      return 0;
  }
};

const filteredPeople = (
  people: Person[],
  filter: { sex: string, query: string, centuries: number[] },
): Person[] => {
  const { sex, query, centuries } = filter;
  const includeQuery = (name: string) => (
    name.toLowerCase().includes(query.toLowerCase())
  );

  const sortBySex = sex
    ? people.filter(person => person.sex === sex)
    : people;

  const sortByName = query
    ? sortBySex.filter(({ name, motherName, fatherName }) => (
      includeQuery(name)
      || includeQuery(motherName || '')
      || includeQuery(fatherName || '')
    ))
    : sortBySex;

  const SortByCenturies = centuries.length > 0
    ? sortByName.filter(({ born, died }) => (
      centuries.includes(Math.ceil(born / 100))
      || centuries.includes(Math.ceil(died / 100))
    ))
    : sortByName;

  return SortByCenturies;
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [isTableEmpty, setIsTableEmpty] = useState<boolean>(false);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const loadData = async () => {
    setIsDataLoading(true);
    const peopleFromServer = await getPeople();

    if (!peopleFromServer.length) {
      setIsTableEmpty(true);
      setIsDataLoading(false);

      return;
    }

    setPeople(peopleFromServer);
    setIsDataFetched(true);
    setIsDataLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const peopleWithParent = people.map(person => {
    return {
      ...person,

      motherName: person.motherName ? person.motherName : '-',
      mother: people
        .filter(p => person.motherName === p.name)[0] || null,

      fatherName: person.fatherName ? person.fatherName : '-',
      father: people
        .filter(p => person.fatherName === p.name)[0] || null,
    };
  });

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const filter = {
    sex: query.get('sex') || '',
    query: query.get('query')?.toLowerCase() || '',
    centuries: query.getAll('century').map(c => Number(c)) || [],
  };

  const sort = query.get('sort') || '';
  const order = query.get('order') || '';

  const filtered = useMemo(() => filteredPeople(
    [...peopleWithParent], filter,
  ), [peopleWithParent, filter]);

  const sorted = useMemo(() => {
    return [...filtered].sort((person1, person2) => (
      comparePeople(person1, person2, sort as SortBy)
    ));
  }, [filtered, sort]);

  const visiblePersons = useMemo(() => {
    return order === 'desc'
      ? [...sorted].reverse()
      : sorted;
  }, [sorted, order]);

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
              {isDataLoading && <Loader />}

              {!isDataLoading && !isDataFetched && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isDataFetched && (isTableEmpty ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={visiblePersons} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
