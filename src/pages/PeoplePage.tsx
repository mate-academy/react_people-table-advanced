import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { filterPeople } from '../utils/filterPeople';
import { sortPeople } from '../utils/sortPeople';

const PAGE_TITLE = 'People Page';
const NO_PEOPLE_MESSAGE = 'There are no people on the server';
const SOMETHING_WENT_WRONG_MESSAGE = 'Something went wrong';

const PARAM_KEYS = {
  CENTURY: 'century',
  SEX: 'sex',
  QUERY: 'query',
  SORT: 'sort',
  ORDER: 'order',
};

interface Filters {
  centuries: string[] | null;
  sex: string | null;
  query: string | null;
}

interface Sort {
  sortBy: string | null;
  order: string | null;
}

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[] | []>([]);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    centuries: null,
    sex: null,
    query: null,
  });
  const [sorts, setSorts] = useState<Sort>({
    sortBy: null,
    order: null,
  });

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const initialLoad = async () => {
      try {
        const humans = await getPeople();

        setPeople(humans.map(human => ({
          ...human,
          mother: humans.find(person => person.name === human.motherName),
          father: humans.find(person => person.name === human.fatherName),
        })));
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    initialLoad();
  }, []);

  useEffect(() => {
    setFilters({
      centuries: searchParams.getAll(PARAM_KEYS.CENTURY),
      sex: searchParams.get(PARAM_KEYS.SEX),
      query: searchParams.get(PARAM_KEYS.QUERY),
    });

    setSorts({
      sortBy: searchParams.get(PARAM_KEYS.SORT),
      order: searchParams.get(PARAM_KEYS.ORDER),
    });
  }, [searchParams]);

  const filteredPeople = sortPeople(filterPeople(people, filters), sorts);

  return (
    <>
      <h1 className="title">{PAGE_TITLE}</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? <Loader /> : (
                <>
                  {error && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      {SOMETHING_WENT_WRONG_MESSAGE}
                    </p>
                  )}

                  {!people.length && !isLoading ? (
                    <p data-cy="noPeopleMessage">{NO_PEOPLE_MESSAGE}</p>
                  ) : (
                    <PeopleTable people={filteredPeople} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
