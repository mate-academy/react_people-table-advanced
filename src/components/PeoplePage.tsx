import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

const filterSet = (
  activeCenturies: string[],
  people: Person[],
  query: string,
  sex: string,
  sort: string,
  order: string,
) => {
  let tempPeople = [...people];

  if (query) {
    tempPeople = tempPeople.filter(
      pers =>
        pers.name.toLowerCase().includes(query.toLowerCase()) ||
        pers.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
        pers.motherName?.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (sex) {
    tempPeople = tempPeople.filter(pers => pers.sex === sex);
  }

  if (activeCenturies.length) {
    tempPeople = tempPeople.filter(pers => {
      const perCen = activeCenturies.find(
        cen => +cen - 1 === +pers.born.toString().slice(0, 2),
      );

      return !!perCen;
    });
  }

  debugger;

  if (sort) {
    tempPeople = tempPeople.sort((per1, per2) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return per1[sort].localeCompare(per2[sort]);

        case 'born':
        case 'died':
          return per1[sort] - per2[sort];

        default:
          return 0;
      }
    });
  }

  if (order) {
    tempPeople = tempPeople.reverse();
  }

  return tempPeople;
};

export const PeoplePage = () => {
  const [isLoaging, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [isErrors, setIsErroros] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const activeCenturies = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    getPeople()
      .then(data =>
        setPeople(
          data.map(per => {
            const mother = data.find(per1 => per1.name === per.motherName);
            const father = data.find(per1 => per1.name === per.fatherName);

            return { ...per, mother, father };
          }),
        ),
      )
      .catch(() => setIsErroros(true))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const peopleFilter = filterSet(
    activeCenturies,
    people,
    query,
    sex,
    sort,
    order,
  );

  const noServerItem = !isLoaging && !people.length;
  const noPanelPeople = !isLoaging && !!peopleFilter.length;
  const noItemFilter = !peopleFilter.length && people && !isLoaging;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoaging && (
              <PeopleFilters
                query={query}
                sex={sex}
                activeCenturies={activeCenturies}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoaging && <Loader />}

              {isErrors && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {noServerItem && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noItemFilter && (
                <p>There are no people matching the current search criteria</p>
              )}

              {noPanelPeople && (
                <PeopleTable people={peopleFilter} sort={sort} order={order} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
