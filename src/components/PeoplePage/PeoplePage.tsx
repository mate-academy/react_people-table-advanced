import { useEffect, useState } from 'react';
import { useMatch, useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleFilters } from '../PeopleFilters';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types/Person';
import { ErrorTypes } from '../../types/ErrorTypes';
import { getCentry, sortPeople } from '../../utils';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoaded, setIsPeopleLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorNoteShown, setErrorNoteShown] = useState(false);
  const match = useMatch('/people/:slug');
  const selectedPerson = match?.params.slug;

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const fetchPerson = async () => {
    setIsLoading(true);
    setIsPeopleLoaded(false);
    setErrorNoteShown(false);
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setErrorNoteShown(true);
    } finally {
      setIsLoading(false);
      setIsPeopleLoaded(true);
    }
  };

  useEffect(() => {
    fetchPerson();
  }, []);

  let copyPeople = [...people];

  const getPeopleShow = () => {
    sortPeople(copyPeople, sort);

    if (sex === 'm') {
      copyPeople = copyPeople.filter((person) => person.sex === 'm');
    }

    if (sex === 'f') {
      copyPeople = copyPeople.filter((person) => person.sex === 'f');
    }

    if (query.trim()) {
      copyPeople = copyPeople.filter((person) => person.name.toLowerCase()
        .includes(query.trim().toLowerCase()));
    }

    if (centuries.length) {
      copyPeople = copyPeople.filter((person) => centuries
        .includes(getCentry(person.born).toString()));
    }

    return copyPeople;
  };

  const visiblePeople = order ? getPeopleShow() : getPeopleShow().reverse();

  const isPeopleListEmpty = people.length === 0;
  const isVisiblePeopleListEmpty = visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isPeopleLoaded && !isPeopleListEmpty && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                sex={sex}
                centuries={centuries}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {isErrorNoteShown && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {ErrorTypes.Loading}
                </p>
              )}
              {isPeopleLoaded && isPeopleListEmpty && (
                <p data-cy="noPeopleMessage">{ErrorTypes.Empty}</p>
              )}

              {isPeopleLoaded && isVisiblePeopleListEmpty && (
                <p>{ErrorTypes.Sort}</p>
              )}

              {isPeopleLoaded
                && !isPeopleListEmpty
                && !isErrorNoteShown
                && !isVisiblePeopleListEmpty && (
                <PeopleTable
                  people={visiblePeople}
                  selectedPerson={selectedPerson}
                  sort={sort}
                  order={order}
                  searchParams={searchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
