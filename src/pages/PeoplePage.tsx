import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

const getFilteredPeople = (
  people: Person[],
  {
    sex,
    centuries,
    query,
    sort,
    order,
  }: {
    sex: string | null;
    centuries: string[];
    query: string | null;
    sort: string | null;
    order: string | null;
  },
) => {
  let visiblePeople = [...people];

  //filter by sex

  if (sex) {
    if (sex === 'm') {
      visiblePeople = visiblePeople.filter(person => person.sex === 'm');
    }

    if (sex === 'f') {
      visiblePeople = visiblePeople.filter(person => person.sex === 'f');
    }
  }

  //filter by centuries

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const bornCentury = Math.ceil(person.born / 100);

      return centuries.includes(String(bornCentury));
    });
  }

  //filter by query

  if (query) {
    const normalisedQuery = query.trim().toLowerCase();

    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(normalisedQuery) ||
        person.motherName?.toLowerCase().includes(normalisedQuery) ||
        person.fatherName?.toLowerCase().includes(normalisedQuery),
    );
  }

  // sort

  if (sort) {
    visiblePeople = visiblePeople.sort((person1, person2) => {
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
  }

  if (order === 'desc') {
    visiblePeople = visiblePeople.reverse();
  }

  return visiblePeople;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || null;
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  useEffect(() => {
    setErrorMessage('');
    setLoader(true);
    const loadPeople = async () => {
      try {
        const loadedPeople = await getPeople();

        setPeople(loadedPeople);
      } catch {
        setErrorMessage('Something went wrong');
      } finally {
        setLoader(false);
      }
    };

    loadPeople();
  }, []);

  const visiblePeople = getFilteredPeople(people, {
    sex,
    centuries,
    query,
    sort,
    order,
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loader && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loader ? (
                <Loader />
              ) : visiblePeople.length === 0 && people.length > 0 ? (
                <p>There are no people matching the current search criteria</p>
              ) : people.length > 0 ? (
                <PeopleTable people={visiblePeople} />
              ) : (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
