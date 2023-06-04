import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { filterPeople, getPeople, sortPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFilters';
import { getSearchWith } from '../../utils/searchHelper';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [inputName, setInputName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();

  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const findPerson = useCallback((name: string, fetchedPeople: Person[]) => {
    return fetchedPeople.find(person => person.name === name);
  }, []);

  useEffect(() => {
    const fetchPeople = async () => {
      if (hasError) {
        setHasError(false);
      }

      setIsLoading(true);

      try {
        const fetchedPeople = await getPeople();

        const peopleWithParents = fetchedPeople.map(person => {
          return {
            ...person,
            mother: person.motherName
              ? findPerson(person.motherName, fetchedPeople)
              : null,
            father: person.fatherName
              ? findPerson(person.fatherName, fetchedPeople)
              : null,
          };
        });

        setPeople(peopleWithParents);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  useEffect(() => (
    setSearchParams(
      getSearchWith(searchParams, { query: inputName || null }),
    )
  ), [inputName]);

  const filteredPeople = useMemo(() => (
    filterPeople(people, sex, inputName, centuries)
  ), [people, sex, inputName, centuries]);

  const sortedPeople = useMemo(() => (
    sortPeople(filteredPeople, sort, order)
  ), [filteredPeople, sort, order]);

  const shouldShowNoPeopleMessage = !hasError && !isLoading && !people.length;
  const noMatchingPeople = !filteredPeople.length && !isLoading && !hasError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                sex={sex}
                inputName={inputName}
                centuries={centuries}
                onInputChange={setInputName}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {shouldShowNoPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noMatchingPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {filteredPeople.length > 0 && (
                <PeopleTable
                  people={sortedPeople}
                  slug={slug}
                  sort={sort}
                  order={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
