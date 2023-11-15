import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';
import { Century, Gender } from '../types/Filters';
import { TableHeader } from '../types/TableHeader';

type VisiblePeople = {
  people: Person[],
  selectedGender: Gender,
  query: string,
  selectedCenturies: Century[],
  sortBy: TableHeader | string,
  isReversed: boolean,
};

export const getVisiblePeople = ({
  people,
  selectedGender,
  query,
  selectedCenturies,
  sortBy,
  isReversed,
}: VisiblePeople) => {
  let visiblePeople = [...people];

  if (selectedGender) {
    visiblePeople = visiblePeople.filter(({ sex }) => {
      const genderHelper = {
        [Gender.All]: sex,
        [Gender.Male]: 'm',
        [Gender.Female]: 'f',
      };

      return sex === genderHelper[selectedGender];
    });
  }

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    visiblePeople = visiblePeople.filter(person => (
      person.name.toLowerCase().includes(normalizedQuery)
        || person.motherName?.toLowerCase().includes(normalizedQuery)
        || person.fatherName?.toLowerCase().includes(normalizedQuery)
    ));
  }

  if (selectedCenturies.length) {
    visiblePeople = visiblePeople.filter(({ born }) => (
      selectedCenturies.includes((born + 100).toString().slice(0, 2) as Century)
    ));
  }

  if (sortBy) {
    visiblePeople.sort((a, b) => {
      switch (sortBy) {
        case TableHeader.Name:
          return a.name.localeCompare(b.name);

        case TableHeader.Sex:
          return a.sex.localeCompare(b.sex);

        case TableHeader.Born:
          return a.born - b.born;

        case TableHeader.Died:
          return a.died - b.died;

        default:
          return 0;
      }
    });

    if (isReversed) {
      visiblePeople.reverse();
    }
  }

  return visiblePeople;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedGender, setSelectedGender] = useState(Gender.All);
  const [query, setQuery] = useState('');
  const [selectedCenturies, setSelectedCenturies] = useState<Century[]>([]);
  const [sortBy, setSortBy] = useState<TableHeader | string>('');
  const [isReversed, setIsReversed] = useState(false);

  const loadPeople = async () => {
    setLoading(true);

    try {
      const response = await getPeople();

      setPeople(response);
      setLoading(false);
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const toggleCentury = (century: Century) => {
    if (selectedCenturies.includes(century)) {
      setSelectedCenturies(prevCenturies => prevCenturies
        .filter(prev => prev !== century));
    } else {
      setSelectedCenturies(prev => [...prev, century]);
    }
  };

  const toggleSortBy = (tableHeader: TableHeader) => {
    const firstClick = sortBy !== tableHeader;
    const secondClick = sortBy === tableHeader && !isReversed;
    const thirdClick = sortBy === tableHeader && isReversed;

    if (firstClick) {
      setSortBy(tableHeader);
      setIsReversed(false);
    }

    if (secondClick) {
      setIsReversed(true);
    }

    if (thirdClick) {
      setSortBy('');
      setIsReversed(false);
    }
  };

  const resetFilters = () => {
    if (selectedGender) {
      setSelectedGender(Gender.All);
    }

    if (query) {
      setQuery('');
    }

    if (selectedCenturies.length) {
      setSelectedCenturies([]);
    }
  };

  const visiblePeople = getVisiblePeople({
    people,
    selectedGender,
    query,
    selectedCenturies,
    sortBy,
    isReversed,
  });

  const preparedTable = visiblePeople.length && !loading
    ? (
      <PeopleTable
        people={visiblePeople}
        collection={people}
        toggleSortBy={toggleSortBy}
        sortBy={sortBy}
        isReversed={isReversed}
      />
    )
    : <p>There are no people matching the current search criteria</p>;

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              {!loading && (
                <PeopleFilters
                  selectedGender={selectedGender}
                  setSelectedGender={setSelectedGender}
                  query={query}
                  setQuery={setQuery}
                  selectedCenturies={selectedCenturies}
                  setSelectedCenturies={setSelectedCenturies}
                  sortBy={sortBy}
                  isReversed={isReversed}
                  toggleCentury={toggleCentury}
                  resetFilters={resetFilters}
                />
              )}
            </div>

            <div className="column">
              <div className="box table-container">
                {loading
                  ? <Loader />
                  : preparedTable}

                {isError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {!people.length && !loading && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
