import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { useEffect, useState } from 'react';
import { Order, Person, SortType } from '../types';
import { ErrorMassege } from '../types/ErrorMassege';
import { getPeople } from '../api';
import { ErrorMessage } from '../components/ErrorMassege';
import { PeopleTable } from '../components/PeopleTable';
import { useSearchParams } from 'react-router-dom';
import { filteringPeople } from '../utils/filterPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<ErrorMassege | null>(null);
  const [loader, setLoader] = useState(false);

  const [searchParams] = useSearchParams();

  const query = (searchParams.get('query') || '').trim().toLowerCase();
  const centuries = searchParams.getAll('centuries') || null;
  const sex = searchParams.get('sex');

  const sort = searchParams.get('sort') as SortType | null;
  const order = (searchParams.get('order') as Order) || 'asc';

  const visiblePeople = filteringPeople(
    people,
    sex,
    query,
    centuries,
    order,
    sort,
  );
  const isVisible = people && !loader && !error && visiblePeople.length !== 0;

  useEffect(() => {
    setLoader(true);
    setError(null);

    getPeople()
      .then(peopleList => {
        setPeople(peopleList);

        if (peopleList.length === 0) {
          setError(ErrorMassege.NoPeople);
        }
      })
      .catch(() => setError(ErrorMassege.SomethingWentWrong))
      .finally(() => {
        setPeople(currentPeople =>
          currentPeople.map(currentPerson => ({
            ...currentPerson,
            father: currentPeople.find(
              person => person.name === currentPerson.fatherName,
            ),
            mother: currentPeople.find(
              person => person.name === currentPerson.motherName,
            ),
          })),
        );

        setLoader(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people && !loader && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}

              {error && <ErrorMessage error={error} />}

              {visiblePeople.length === 0 && !loader && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isVisible && <PeopleTable people={visiblePeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
