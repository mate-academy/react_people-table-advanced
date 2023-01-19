import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { Error } from '../types/Error';
import { ErrorMessage } from '../types/ErrorMessage';
import { SortBy } from '../types/SortBy';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<Error>({
    status: false,
    notification: ErrorMessage.None,
  });

  const [searchParams] = useSearchParams();
  const centuriesParams = searchParams.getAll('centuries');
  const queryParam = searchParams.get('query');
  const sexParam = searchParams.get('sex');
  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order');

  const { slug } = useParams();

  async function getPeopleFromServer() {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      if (peopleFromServer.length === 0) {
        setIsError({
          status: true,
          notification: ErrorMessage.Empty,
        });
      }

      setPeople([...peopleFromServer]);
    } catch {
      setIsError({
        status: true,
        notification: ErrorMessage.Load,
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const displayError = (error: Error) => {
    switch (error.notification) {
      case ErrorMessage.Empty:
        return (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        );

      case ErrorMessage.Load:
        return (
          <p data-cy="peopleLoadingError">
            Something went wrong
          </p>
        );

      default:
        return '';
    }
  };

  const visiblePeople = useMemo(() => {
    let visible = [...people];

    if (queryParam) {
      visible = visible.filter(person => {
        const checkedQuery = queryParam.trim().toLowerCase();

        const isFittedName = person.name.toLowerCase().includes(checkedQuery);
        const isFittedMotherName = person.motherName
          ? person.motherName.toLowerCase().includes(checkedQuery)
          : false;
        const isFittedFatherName = person.fatherName
          ? person.fatherName.toLowerCase().includes(checkedQuery)
          : false;

        return (isFittedName || isFittedMotherName || isFittedFatherName);
      });
    }

    if (centuriesParams.length) {
      visible = visible.filter(person => {
        const centuryBorn = (Math.floor(person.born / 100) + 1).toString();
        
        return centuriesParams.includes(centuryBorn);
      })
    }

    if (sexParam) {
      visible = visible.filter(person => person.sex === sexParam);
    }

    const sortedList = [...visible].sort((person1, person2) => {
      switch (sortParam) {
        case SortBy.Name:
        case SortBy.Sex:
          return person1[sortParam].localeCompare(person2[sortParam]);

        case SortBy.Born:
        case SortBy.Died:
          return person1[sortParam] - person2[sortParam];

        default:
          return 0;
      }
    });
    
    visible = orderParam ? sortedList.reverse() : sortedList;

    return visible;
  }, [queryParam,
    centuriesParams,
    people,
    sortParam,
    orderParam,
  ]);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading
        ? <Loader />
        : (isError.status && displayError(isError))}

      {(!isLoading && !isError.status && !visiblePeople.length) && (
        `${ErrorMessage.Search}`
      )}

      {(!isLoading && !isError.status && visiblePeople.length !== 0) && (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                <PeopleTable
                  people={visiblePeople}
                  personSlug={slug}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
