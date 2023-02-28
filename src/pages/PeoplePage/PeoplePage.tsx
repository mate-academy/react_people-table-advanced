import {
  FC,
  memo,
  useEffect,
  useState,
} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { Person } from '../../types/Person';
import { PeopleTable } from '../../components/PeopleTable';
import { preparePeople } from '../../utils/preparePeople';
import { PeopleFilters } from '../../components/PeopleFilters';

export const PeoplePage: FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [
    filteredAndSortedPeople,
    setFilteredAndSortedPeople,
  ] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);
  const [error, setError] = useState(false);
  const { selectedPerson = 0 } = useParams();
  const [searchParams] = useSearchParams();

  const loadPeople = async () => {
    try {
      const peopleFromServer = await getPeople();
      const preparedPeopleFromServer = preparePeople(peopleFromServer);

      setFilteredAndSortedPeople(preparedPeopleFromServer);
      setPeople(preparedPeopleFromServer);
    } catch {
      setError(true);
    } finally {
      setIsPeopleLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const filterPeopleBySex = (currentPeople: Person[]) => {
    const selectedSex = searchParams.get('sex');
    const currentPeopleFiltered = currentPeople.filter(person => (
      person.sex === selectedSex
    ));

    return (
      currentPeopleFiltered.length
        ? currentPeopleFiltered
        : people
    );
  };

  const filterPeopleByQuery = (currentPeople: Person[]) => {
    const lowerCaseInputQuery = searchParams
      .get('query')?.toLowerCase().trimStart();

    if (lowerCaseInputQuery) {
      return currentPeople.filter(person => {
        const compareString = (person.name
          + person.motherName
          + person.fatherName).toLowerCase();

        return compareString.includes(lowerCaseInputQuery);
      });
    }

    return currentPeople;
  };

  const filterPeopleByCenturies = (currentPeople: Person[]) => (
    currentPeople.filter(person => (
      searchParams.getAll('centuries')
        .includes(Math.floor(person.born / 100 + 1).toString())
    ))
  );

  const sortPeople = (currentPeople: Person[]) => {
    const sortBy = searchParams.get('sort');
    const order = searchParams.get('order');
    const sortedPeople = [...currentPeople];

    switch (sortBy) {
      case 'name':
      case 'sex': sortedPeople.sort((p1, p2) => {
        if (order) {
          return p2[sortBy].localeCompare(p1[sortBy]);
        }

        return p1[sortBy].localeCompare(p2[sortBy]);
      });
        break;

      case 'born':
      case 'died': sortedPeople.sort((p1, p2) => {
        if (order) {
          return Number(p2[sortBy]) - Number(p1[sortBy]);
        }

        return Number(p1[sortBy]) - Number(p2[sortBy]);
      });
        break;

      default: return sortedPeople;
    }

    return sortedPeople;
  };

  useEffect(() => {
    let currentFilteredPeople = people;

    if (searchParams.get('sex')) {
      currentFilteredPeople = filterPeopleBySex(currentFilteredPeople);
    }

    if (searchParams.get('query')) {
      currentFilteredPeople = filterPeopleByQuery(currentFilteredPeople);
    }

    if (searchParams.getAll('centuries').length) {
      currentFilteredPeople = filterPeopleByCenturies(currentFilteredPeople);
    }

    if (searchParams.get('sort')) {
      currentFilteredPeople = sortPeople(currentFilteredPeople);
    }

    setFilteredAndSortedPeople(currentFilteredPeople);
  }, [searchParams, people]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isPeopleLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(people.length === 0 && !isPeopleLoading) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!filteredAndSortedPeople.length && (
                <PeopleTable
                  people={filteredAndSortedPeople}
                  selectedPerson={selectedPerson}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
