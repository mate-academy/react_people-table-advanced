import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleFilter } from '../PeopleFilter/PeopleFilter';
import { PeopleTable } from '../PeopleTable/PeopleTable';

const updatePeople = (loadPeople: Person[]) => {
  const updatedPeople = loadPeople.map(person => {
    return {
      ...person,
      mother:
        loadPeople.find(mother => mother.name === person.motherName),
      father:
        loadPeople.find(father => father.name === person.fatherName),
    };
  });

  return updatedPeople;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noPeople, setNoPeople] = useState<boolean>(false);
  const { slug = '' } = useParams();
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      try {
        const loadPeople = await getPeople();

        setPeople(updatePeople(loadPeople));
        setIsLoading(true);
      } catch {
        setHasError(true);
      }
    };

    loadData();
  }, []);

  const filterPeople = () => {
    if (!people) {
      return null;
    }

    if (people.length === 0) {
      setNoPeople(true);
    }

    let filteredPeople = [...people];

    if (location.search.includes('sex=')) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (location.search.includes('centuries')) {
      filteredPeople
        = filteredPeople.filter(person => centuries.includes(String(
          Math.floor(person.born / 100) + 1,
        )));
    }

    if (location.search.includes('query')) {
      filteredPeople
        = filteredPeople.filter(person => person.name
          .toLowerCase().includes(query.toLowerCase())
      || person.fatherName?.toLowerCase().includes(query.toLowerCase())
      || person.motherName?.toLowerCase().includes(query.toLowerCase()));
    }

    return filteredPeople;
  };

  const filteredPeople = useMemo(filterPeople, [location.search, people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading
            ? <Loader />
            : (
              <>
                <div className="column is-7-tablet is-narrow-desktop">
                  <PeopleFilter
                    sex={sex}
                    query={query}
                    centuries={centuries}
                  />
                </div>

                <div className="column">
                  <div className="box table-container">
                    {hasError
                      ? (
                        <p
                          data-cy="peopleLoadingError"
                          className="has-text-danger"
                        >
                          Something went wrong
                        </p>
                      )
                      : (
                        <PeopleTable
                          people={filteredPeople}
                          noPeople={noPeople}
                          selectedPerson={slug}
                        />
                      )}
                  </div>
                </div>
              </>
            )}
        </div>
      </div>
    </>
  );
};
